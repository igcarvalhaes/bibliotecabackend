import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./utils/env";
import { usuariosRoutes } from "./routes/usuarios.routes";
import { livrosRoutes } from "./routes/livros.routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// configurar compiladores do zod
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// registrar JWT
app.register(fastifyJwt, {
  secret: env.SECRET_JWT,
});

// Decorator para autenticaçao
app.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({
      error: "Você precisa estar logado",
    });
  }
});

// registrar rotas
app.register(usuariosRoutes);
app.register(livrosRoutes);

app.get("/", () => {
  return { message: "API Rodando" };
});

app
  .listen({ port: 3000, host: "0.0.0.0" })
  .then((address) => console.log(`Servidor rodando em ${address}`));
