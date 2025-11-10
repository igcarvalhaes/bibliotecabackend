import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { livrosRoutes } from "./routes/livros.routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// configurar compiladores do zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// registrar rotas
app.register(livrosRoutes);

app.get("/", () => {
  return { message: "API Rodando" };
});

app
  .listen({ port: 3000, host: "0.0.0.0" })
  .then((address) => console.log(`Servidor rodando em ${address}`));
