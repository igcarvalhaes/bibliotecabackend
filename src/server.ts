import fastify from "fastify";
import { livrosRoutes } from "./routes/livros.routes";

const app = fastify();

// registrar rotas
app.register(livrosRoutes);

app.get("/", () => {
  return { message: "API Rodando" };
});

app
  .listen({ port: 3000, host: "0.0.0.0" })
  .then((address) => console.log(`Servidor rodando em ${address}`));
