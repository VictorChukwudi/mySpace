const jwt=require("jsonwebtoken")
const verifyJWT=async(req,reply)=>{
    try {
        const authHeader=req.headers["authorization"]
        if(typeof authHeader !=="undefined"){
            const token = authHeader.split(" ")[1];
            console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // console.log(err);
              reply.code(401).send({
                status: "Error",
                message: "Session Expired. Signin again." || err.message,
              });
            }
            req.user = user;
          });
    }else{
        reply.code(401).send({
            status: "Error",
            msg: "Unauthorized. Login or signup to view this resource",
          });
    }
    } catch (error) {
        // console.log(error);
        reply.code(401).send({
            status:"error",
            message:error.message
        })
    }
}
module.exports=verifyJWT