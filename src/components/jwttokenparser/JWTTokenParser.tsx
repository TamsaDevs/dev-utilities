'use client'

import React from 'react'
import {toast} from "sonner"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Key } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const JWTToeknParser = () => {
    const [token, setToken] = useState("")
  const [decodedHeader, setDecodedHeader] = useState("")
  const [decodedPayload, setDecodedPayload] = useState("")
  const [signature, setSignature] = useState("")
  const [isDecoded, setIsDecoded] = useState(false)
 

  // Decode JWT token
  const decodeToken = () => {
    try {
      if (!token.trim()) {
        toast("Token is empty",{
        
          description: "Please enter a JWT token to decode",
          
        })
        return
      }

      const parts = token.split(".")
      if (parts.length !== 3) {
        throw new Error("Invalid JWT token format")
      }

      // Decode header
      const headerBase64 = parts[0]
      const headerJson = atob(headerBase64.replace(/-/g, "+").replace(/_/g, "/"))
      const header = JSON.parse(headerJson)
      setDecodedHeader(JSON.stringify(header, null, 2))

      // Decode payload
      const payloadBase64 = parts[1]
      const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"))
      const payload = JSON.parse(payloadJson)
      setDecodedPayload(JSON.stringify(payload, null, 2))

      // Set signature (not decoded as it's binary data)
      setSignature(parts[2])

      setIsDecoded(true)
      toast( "Token decoded",{
       
        description: "JWT token successfully decoded",
      })
    } catch (error) {
      toast(  "Decoding failed",{
       
        description: error instanceof Error ? error.message : "Invalid JWT token format",
       
      })
      setIsDecoded(false)
      setDecodedHeader("")
      setDecodedPayload("")
      setSignature("")
    }
  }

  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast( "Copied to clipboard",{
     
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
              onChange={(e) => setToken(e.target.value)}
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
                    <Textarea value={decodedHeader} readOnly className="min-h-[200px] font-mono text-sm bg-muted/30" />
                    <button
                      onClick={() => copyToClipboard(decodedHeader)}
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
                    <Textarea value={decodedPayload} readOnly className="min-h-[200px] font-mono text-sm bg-muted/30" />
                    <button
                      onClick={() => copyToClipboard(decodedPayload)}
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