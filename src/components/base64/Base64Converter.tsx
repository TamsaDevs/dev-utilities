'use client'

import { useState } from "react"
import { ArrowDown, ArrowUp, Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  encodeToBase64, 
  decodeFromBase64, 
  encodeToBase64Chunked, 
  decodeFromBase64Chunked,
  isValidBase64
} from "@/utils/base64/base64utils"

export default function Base64Converter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [activeTab, setActiveTab] = useState("encode")
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  console.log("Processing:", processing)
  console.log("Error:", error);
  
  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast("Copied to clipboard",{
      description: "Text has been copied to your clipboard",
    })
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setInput("")
    setOutput("")
    setError(null)
  }

  // Handle encoding process
  const handleEncode = () => {
    setProcessing(true)
    setError(null)
    
    try {
      // Use chunked processing for large inputs
      const result = input.length > 100000 
        ? encodeToBase64Chunked(input) 
        : encodeToBase64(input)
      
      setOutput(result)
    } catch (err) {
      setError((err as Error).message)
      toast("Encoding Error",{
        description: (err as Error).message,
      })
    } finally {
      setProcessing(false)
    }
  }

  // Handle decoding process
  const handleDecode = () => {
    setProcessing(true)
    setError(null)
    
    if (!input.trim()) {
      setOutput("")
      setProcessing(false)
      return
    }
    
    if (!isValidBase64(input)) {
      setError("Input is not valid Base64")
      toast( "Invalid Base64",{
        description: "Please enter valid Base64 encoded text",
      })
      setProcessing(false)
      return
    }
    
    try {
      // Use chunked processing for large inputs
      const result = input.length > 100000 
        ? decodeFromBase64Chunked(input) 
        : decodeFromBase64(input)
      
      setOutput(result)
    } catch (err) {
      setError((err as Error).message)
      toast("Decoding Error",{
        description: (err as Error).message,
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <main className="flex-1 container max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Tabs for encode/decode */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode to Base64</TabsTrigger>
              <TabsTrigger value="decode">Decode from Base64</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Input field */}
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={activeTab === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 to decode..."}
              className="min-h-[120px] pr-10 font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(input)}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Copy input"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            <Button onClick={activeTab === "encode" ? handleEncode : handleDecode} className="gap-2">
              {activeTab === "encode" ? (
                <>
                  <ArrowDown className="h-4 w-4" />
                  Encode to Base64
                </>
              ) : (
                <>
                  <ArrowUp className="h-4 w-4" />
                  Decode from Base64
                </>
              )}
            </Button>
          </div>

          {/* Output field */}
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="min-h-[120px] pr-10 font-mono text-sm bg-muted/30"
            />
            <button
              onClick={() => copyToClipboard(output)}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Copy output"
              disabled={!output}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          {/* Information box */}
          <div className="bg-muted/50 p-4 rounded-lg text-sm">
            <h3 className="font-medium mb-2">About Base64</h3>
            <p>
              Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format
              by translating it into a radix-64 representation.
            </p>
            <p className="mt-2">
              {activeTab === "encode"
                ? "Encoding to Base64 is useful for transmitting binary data in environments that only support text."
                : "Decoding from Base64 converts the encoded string back to its original form."}
            </p>
          </div>
        </div>
      </main>
  )
}