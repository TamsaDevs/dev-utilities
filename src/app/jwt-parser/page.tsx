import JWTToeknParser from "@/components/jwttokenparser/JWTTokenParser";
import { metadata } from "../layout";

export default function JwtParser() {
  
  metadata.title = "JWT Token Parser";
  metadata.description = "Decode and parse JWT tokens easily with our online tool. Just paste your JWT token and get the decoded result instantly.";
  
  return (
    <JWTToeknParser />
  );
}
