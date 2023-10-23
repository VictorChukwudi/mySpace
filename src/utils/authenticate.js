require("dotenv").config()
const jwt=require("jsonwebtoken");
const fastify = require("../../app.server");
const verifyJWTtoken=(req,reply,done)=>{
 const authHeader=req.headers

 if(typeof authHeader !== "undefined"){
  const token=authHeader.split('')[1];

  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if (err) {
      done(new Error("Session Expired. Signin again."))
    }
    req.user = user;
  })
  done();
 }
}



// fastify.decorate("verifyToken",verifyJWTtoken)

module.exports=verifyJWTtoken