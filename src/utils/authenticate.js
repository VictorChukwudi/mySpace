require("dotenv").config();
const fp = require("fastify-plugin");
module.exports = fp(async (fastify, options) => {
  // fastify.register(require("@fastify/jwt"), {
  //   secret: process.env.JWT_SECRET,
  // });
  fastify.decorate("authenticate", async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      reply.code(403).send({
        status: "error",
        message: error.message,
      });
    }
  });
});
