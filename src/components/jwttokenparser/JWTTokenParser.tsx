'use client'

import React from 'react'
import { toast } from "sonner"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Key } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { decodeJWT, isTokenExpired, getExpirationTime, getSpecificError } from '@/utils/jwttokenparser/jwttokenparserutils';


interface DecodedJWTState {
    header: string;
    payload: string;
    signature: string;
    isDecoded: boolean;
    expirationInfo: string | null;
}


const JWTToeknParser: React.FC = () => {


    const [token, setToken] = useState<string>("");
    const [decodedState, setDecodedState] = useState<DecodedJWTState>({
        header: "",
        payload: "",
        signature: "",
        isDecoded: false,
        expirationInfo: null
    });

    // Decode JWT token
    const decodeToken = (): void => {
        try {
            if (!token.trim()) {
                toast("Token is empty", {
                    description: "Please enter a JWT token to decode",
                });
                return;
            }

            // Check for specific issues before attempting to decode
            const specificError = getSpecificError(token);
            if (specificError) {
                throw new Error(specificError);
            }

            // Use the utility function to decode the token
            const decoded = decodeJWT(token);

            // Check expiration
            const expired = isTokenExpired(decoded.payload);
            const expirationTime = getExpirationTime(decoded.payload);

            const expirationInfo = expirationTime
                ? `Token ${expired ? 'expired' : 'expires'} at ${expirationTime}`
                : 'No expiration information';

            // Update the decoded state all at once to avoid multiple rerenders
            setDecodedState({
                header: JSON.stringify(decoded.header, null, 2),
                payload: JSON.stringify(decoded.payload, null, 2),
                signature: decoded.signature,
                isDecoded: true,
                expirationInfo
            });

            console.log("Expiration Info:", expirationInfo);

            toast("Token decoded", {
                description: "JWT token successfully decoded",
            });
        } catch (error) {
            toast("Decoding failed", {
                description: error instanceof Error ? error.message : "Invalid JWT token format",
            });
            
            // Reset the decoded state on error
            setDecodedState({
                header: "",
                payload: "",
                signature: "",
                isDecoded: false,
                expirationInfo: null
            });
        }
    };

    const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setToken(e.target.value);
    };

    const { header, payload, signature, isDecoded, expirationInfo } = decodedState;

    console.log("expirationInfo", expirationInfo);
    
    // Copy text to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast("Copied to clipboard", {

            description: "Text has been copied to your clipboard",
        })
    }



    return (
        <main className="flex-1 container max-w-3xl mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Input field */}
                <div className="relative">
                    <Textarea
                        value={token}
                        onChange={(e) => handleTokenChange(e)}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                        className="min-h-[100px] pr-10 font-mono text-sm"
                    />
                    <button
                        onClick={() => copyToClipboard(token)}
                        className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
                        aria-label="Copy token"
                    >
                        <Copy className="h-4 w-4" />
                    </button>
                </div>

                {/* Decode button */}
                <div className="flex justify-center">
                    <Button onClick={decodeToken} className="gap-2">
                        <Key className="h-4 w-4" />
                        Decode Token
                    </Button>
                </div>

                {/* Output sections */}
                {isDecoded && (
                    <Tabs defaultValue="header" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="header">Header</TabsTrigger>
                            <TabsTrigger value="payload">Payload</TabsTrigger>
                            <TabsTrigger value="signature">Signature</TabsTrigger>
                        </TabsList>

                        <TabsContent value="header">
                            <Card>
                                <CardContent className="pt-6 relative">
                                    <Textarea value={header} readOnly className="min-h-[200px] font-mono text-sm bg-muted/30" />
                                    <button
                                        onClick={() => copyToClipboard(header)}
                                        className="absolute top-9 right-3 p-1 rounded-md hover:bg-muted transition-colors"
                                        aria-label="Copy header"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="payload">
                            <Card>
                                <CardContent className="pt-6 relative">
                                    <Textarea value={payload} readOnly className="min-h-[200px] font-mono text-sm bg-muted/30" />
                                    <button
                                        onClick={() => copyToClipboard(payload)}
                                        className="absolute top-9 right-3 p-1 rounded-md hover:bg-muted transition-colors"
                                        aria-label="Copy payload"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="signature">
                            <Card>
                                <CardContent className="pt-6 relative">
                                    <Textarea value={signature} readOnly className="min-h-[80px] font-mono text-sm bg-muted/30" />
                                    <button
                                        onClick={() => copyToClipboard(signature)}
                                        className="absolute top-9 right-3 p-1 rounded-md hover:bg-muted transition-colors"
                                        aria-label="Copy signature"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </main>
    )
}

export default JWTToeknParser