import { betterAuth } from "better-auth";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3002",

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],

  database: new Pool({
    connectionString: databaseUrl,
    ...(databaseUrl?.includes("sslmode=require")
      ? { ssl: { rejectUnauthorized: false } }
      : {}),
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),

    ...(process.env.GITHUB_CLIENT_ID &&
    process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },

  user: {
    additionalFields: {},
  },
});