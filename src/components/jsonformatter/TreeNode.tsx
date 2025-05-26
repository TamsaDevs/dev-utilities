import { JSONValue } from "@/utils/jsonformatter/jsonformatterutils"
import {
    ChevronRight,
    ChevronDown,
} from "lucide-react"



export interface TreeNodeProps {
    name: string
    value: JSONValue
    isExpanded: boolean
    onToggle: () => void
    level: number
    isLast: boolean
    expandedNodes: Set<string>
    toggleNode: (path: string) => void
}

export const TreeNode = ({ name, value, isExpanded, onToggle, level, isLast, expandedNodes, toggleNode }: TreeNodeProps) => {
    const isObject = value !== null && typeof value === "object"
    const isArray = Array.isArray(value)
    const isEmpty = isObject && Object.keys(value).length === 0
    console.log(`Rendering node: ${name}, isExpanded: ${isExpanded}, level: ${level}, isLast: ${isLast}`);
    

    return (
        <div className="font-mono text-sm">
            <div className="flex items-start hover:bg-muted/50 rounded px-1" style={{ paddingLeft: `${level * 16}px` }}>
                {isObject && !isEmpty ? (
                    <button onClick={onToggle} className="mr-1 mt-0.5 focus:outline-none">
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                    </button>
                ) : (
                    <span className="w-5" />
                )}
                <div>
                    {name && name !== "root" && <span className="text-blue-500 dark:text-blue-400">{`"${name}"`}: </span>}
                    {isObject ? (
                        <span>
                            {isArray ? "[" : "{"}
                            {isEmpty ? (isArray ? "]" : "}") : isExpanded ? "" : "..."}
                            {!isExpanded && !isEmpty ? (isArray ? "]" : "}") : ""}
                        </span>
                    ) : (
                        <span
                            className={`${typeof value === "string" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}
                        >
                            {typeof value === "string" ? `"${value}"` : value === null ? "null" : String(value)}
                        </span>
                    )}
                </div>
            </div>
            {isExpanded && isObject && !isEmpty && (
                <div>
                    {Object.entries(value).map(([key, val], index, arr) => {
                        const nodePath = name === "root" ? key : `${name}.${key}`
                        return (
                            <TreeNode
                                key={key}
                                name={key}
                                value={val}
                                isExpanded={expandedNodes.has(nodePath)}
                                onToggle={() => toggleNode(nodePath)}
                                level={level + 1}
                                isLast={index === arr.length - 1}
                                expandedNodes={expandedNodes}
                                toggleNode={toggleNode}
                            />
                        )
                    })}
                    <div className="pl-1 font-mono text-sm" style={{ paddingLeft: `${(level + 1) * 16}px` }}>
                        {isArray ? "]" : "}"}
                    </div>
                </div>
            )}
        </div>
    )
}