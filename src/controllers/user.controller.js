const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const fastify = require("../../app.server");

const register = async (req, reply) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    newUser.password = passwordHash;
    const token = fastify.jwt.sign({ email });
    console.log(token);
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { newUser },
    });
    if (!created) {
      reply.code(400);
      throw new Error("User exists already");
    } else {
      reply.code(201).send({
        status: "success",
        data: user,
        token,
      });
    }
  } catch (error) {
    reply.code(500).send({
      status: "error",
      message: error.message,
    });
  }
};
const login = async (req, reply) => {};
module.exports = {
  register,
  login,
};
