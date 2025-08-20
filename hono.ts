import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";

const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// Mount tRPC router at /api/trpc
app.use(
  "/api/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

// Simple health check endpoint at the root
app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

export default app;
