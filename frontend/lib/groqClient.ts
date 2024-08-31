
import { envConfig } from "@/pages/api/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: envConfig.groq_api_key });

export default groq;