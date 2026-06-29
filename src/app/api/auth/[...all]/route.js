import { auth } from "@/lib/auth"; // Points directly to your existing src/lib/auth.js configuration
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
