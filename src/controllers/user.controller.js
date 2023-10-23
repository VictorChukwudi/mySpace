const errorHandler = require("../utils/errorHandler");
// const bcrypt = require("bcryptjs");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
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
    // console.log(req.body);
    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(password,salt)
    const [user, created] = await User.findOrCreate({
      where: { email},
      defaults: { firstName,lastName,email,password:hash },
    });
    if (!created) {
      reply.code(400);
      throw new Error("Email already registered.");
    } else {
      const payload={
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName
      }
      const token=jwt.sign(payload,process.env.JWT_SECRET)
      reply.code(201).send({
        status: "success",
        data:{...payload,token},
        // token
      });
    }
  } catch (error) {
    // console.log(error)
    reply.send({
      status: "error",
      message: error.message,
    });
  }
};
const login = async (req, reply) => {
 try {
  const {email,password}=req.body;
  if(!email || !password){
    throw new Error("Credentials cannot be empty.")
  }else{
    const user= await User.findOne({where:{email}})
    if(!user || !bcrypt.compareSync(password,user.password)){
      reply.code(404)
      throw new Error("Invalid credentials.")
    }else{
        const payload={
          id:user.id,
          firstName:user.firstName,
          lastName:user.lastName
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET)
        reply.code(200).send({
          status:"success",
          message:"logged in.",
          data:{...payload,token}
        })
      }
    
  }
 } catch (error) {
  reply.send({
    status:"error",
    message:error.message
  })
 }
};
module.exports = {
  register,
  login,
};
