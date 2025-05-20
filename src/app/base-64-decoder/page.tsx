import Base64Converter from "@/components/base64/Base64Converter";
import { metadata } from "../layout";

export default function Base64Decode () {

  metadata.title = "Base64 Decoder";
  metadata.description = "Decode Base64 encoded strings easily with our online tool. Just paste your Base64 string and get the decoded result instantly.";
  
  return (
    <Base64Converter/>
  );
}