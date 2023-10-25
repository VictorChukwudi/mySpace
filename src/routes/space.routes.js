// const fastify = require("../../app.server");
require("dotenv").config()
const { createSpace } = require("../controllers/space.controller");
const jwt=require("jsonwebtoken")
const fastifyAuth=require("@fastify/auth")

const spaceRoutes=(fastify,options, done)=>{
    
    fastify
        .register(fastifyAuth)
        .after(()=>{
        fastify.post("/create",{preHandler: fastify.auth([fastify.asyncVerifyJWT])},createSpace)
        })

done()
}




module.exports=spaceRoutes