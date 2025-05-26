"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Copy,
  Code,
  AlignJustify,
  Braces,
} from "lucide-react"
import { toast } from "sonner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TreeNode } from "./TreeNode"
import { beautifyJSON, highlightJSON, JSONValue } from "@/utils/jsonformatter/jsonformatterutils"




export default function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [parsedJson, setParsedJson] = useState<JSONValue | null>(null)
  const [viewMode, setViewMode] = useState("code")
  const [formatMode, setFormatMode] = useState("beautify")
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["root"]))

  // Format JSON
  const formatJson = (action: "beautify" | "minify") => {
    try {
      if (!input.trim()) {
        toast("Input is empty",{
          description: "Please enter JSON to format",
        })
        return
      }

      const parsed = JSON.parse(input)

      if (action === "beautify") {
        // const formatted = JSON.stringify(parsed, null, 2)
        const formatted = beautifyJSON(parsed)
        setOutput(formatted)
        setParsedJson(parsed)
        console.log("highlighted JSON:", highlightJSON(input))
      } else {
        const minified = JSON.stringify(parsed)
        // const minified = minifyJSON(parsed)
        setOutput(minified)
        setParsedJson(parsed)
      }

      setFormatMode(action)

      toast(action === "beautify" ? "JSON beautified" : "JSON minified",{
        description: "JSON successfully formatted",
      })
      
    } catch (error) {
      toast( "Invalid JSON",{
        description: error instanceof Error ? error.message : "Failed to parse JSON",
      })
    }
  }

  // Toggle node expansion in tree view
  const toggleNode = (path: string) => {
    const newExpandedNodes = new Set(expandedNodes)
    if (newExpandedNodes.has(path)) {
      newExpandedNodes.delete(path)
    } else {
      newExpandedNodes.add(path)
    }
    setExpandedNodes(newExpandedNodes)
  }

  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast("Copied to clipboard",{
      description: "Text has been copied to your clipboard",
    })
  }

  // Render tree view recursively
  const renderTreeView = (data: JSONValue | null) => {
    if (data === null) return null

    return (
      <div className="bg-muted/30 p-4 rounded-md overflow-auto max-h-[400px]">
        <TreeNode
          name="root"
          value={data}
          isExpanded={expandedNodes.has("root")}
          onToggle={() => toggleNode("root")}
          level={0}
          isLast={true}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
        />
      </div>
    )
  }

  // Render code view with folding
  const renderCodeView = () => {
    if (!output) return null

    return (
      <pre className="bg-muted/30 p-4 rounded-md overflow-auto max-h-[400px] relative">
        <code className="font-mono text-sm whitespace-pre-wrap">{output}</code>
        <button
          onClick={() => copyToClipboard(output)}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
          aria-label="Copy output"
        >
          <Copy className="h-4 w-4" />
        </button>
      </pre>
    )
  }

  // Update output when input changes
  useEffect(() => {
    if (input.trim()) {
      try {
        const parsed = JSON.parse(input)
        const formatted = formatMode === "beautify" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed)
        setOutput(formatted)
        setParsedJson(parsed)
      } catch (error) {
        console.log("Invalid JSON input:", error);
        
        // Silently fail, we'll show errors when the user explicitly clicks format
      }
    } else {
      setOutput("")
      setParsedJson(null)
    }
  }, [input, formatMode])

  return (
    
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Input field */}
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"example": "Paste your JSON here", "array": [1, 2, 3]}'
              className="min-h-[150px] pr-10 font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(input)}
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-muted transition-colors"
              aria-label="Copy input"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => formatJson("beautify")} className="gap-2">
              <AlignJustify className="h-4 w-4" />
              Beautify
            </Button>
            <Button onClick={() => formatJson("minify")} className="gap-2">
              <Braces className="h-4 w-4" />
              Minify
            </Button>
          </div>

          {/* View mode toggle */}
          {output && (
            <div className="flex justify-center">
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
                <ToggleGroupItem value="code" aria-label="Code view">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </ToggleGroupItem>
                <ToggleGroupItem value="tree" aria-label="Tree view">
                  <AlignJustify className="h-4 w-4 mr-2" />
                  Tree
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}

          {/* Output area */}
          {output && <div>{viewMode === "code" ? renderCodeView() : renderTreeView(parsedJson)}</div>}

          {/* Information box */}
          <div className="bg-muted/50 p-4 rounded-lg text-sm">
            <h3 className="font-medium mb-2">About JSON Formatter</h3>
            <p>
              This tool helps you format JSON data for better readability or minify it to save space. Use the tree view
              to explore complex JSON structures more easily.
            </p>
            <p className="mt-2">
              <span className="font-medium">Beautify:</span> Formats JSON with proper indentation for readability.
              <br />
              <span className="font-medium">Minify:</span> Removes all whitespace to reduce size.
            </p>
          </div>
        </div>
      </main>
    
  )
}
