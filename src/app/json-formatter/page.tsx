import JsonFormatter from "@/components/jsonformatter/JsonFormatter";
import { metadata } from "../layout";

export default function JSONFormatterPage() {
  
  metadata.title = "JSON Formatter";
  metadata.description = "Format and beautify your JSON data easily with our online JSON formatter. Just paste your JSON and get the formatted result instantly.";
  return (
    <JsonFormatter />
  );
}
