import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";

const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// Health check at the root
app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

// Mount tRPC router directly with the full expected path
app.use(
  "/api/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

export default app;
