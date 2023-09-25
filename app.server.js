require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const port = 8000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;
fastify.register(require("@fastify/jwt"), { secret: process.env.JWT_SECRET });

require("./src/app.config/db");

fastify.register(require("./src/utils/authenticate"));
fastify.register(require("./src/routes/user.routes"), { prefix: "/api/user" });
const start = async () => {
  try {
    await fastify.listen({ port, host });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
module.exports = fastify;
