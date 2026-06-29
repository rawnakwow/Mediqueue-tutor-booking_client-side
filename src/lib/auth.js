import dns from "node:dns";
// Set reliable public DNS targets to avoid internal Node local loop lookup lag
dns.setServers(['8.8.8.8', '8.8.4.4']);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Instantiate the client connection safely without freezing build-time compilers
const client = new MongoClient(process.env.MONGODB_URI || "");
const db = client.db("mediQueueDB"); // Explicitly pass your target database name here

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
    // Add explicitly mapped secondary objects to enforce schema isolation tables
    collections: {
      user: "users",
      session: "sessions",
      account: "accounts",
      verification: "verifications",
    }
  }),


  
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  }
});
