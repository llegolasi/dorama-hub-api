import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";

// A Vercel vai enviar todos os pedidos para cá.
// Vamos criar a rota base /api aqui.
const app = new Hono().basePath('/api');

// Enable CORS for all routes
app.use("*", cors());

// Agora, esta rota vai corresponder a /api/trpc/*
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

// Rota de verificação de saúde, acessível em /api/
app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

export default app;
