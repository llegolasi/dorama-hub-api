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

// Create a sub-app for all /api routes
const api = new Hono();

// Mount the tRPC server on the /trpc path of the sub-app
api.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

// Mount the sub-app on the main app.
// This will handle all requests to /api/*
app.route("/api", api);

export default app;
