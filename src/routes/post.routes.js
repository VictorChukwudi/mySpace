// const fastify = require("../../app.server");
require("dotenv").config()
const jwt=require("jsonwebtoken")
const fastifyAuth=require("@fastify/auth")
const { createPost } = require("../controllers/post.controllers")

const postRoutes=(fastify,options, done)=>{
    
    fastify
        .register(fastifyAuth)
        .after(()=>{
        fastify.post("/create-post/:space_id",{preHandler: fastify.auth([fastify.asyncVerifyJWT])},createPost)
        })

done()
}

module.exports=postRoutes