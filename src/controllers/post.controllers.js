const Post=require("../models/post.model")
const createPost=async=async (req,reply)=>{
    try {
        const {space_id}=req.params
        if(!space_id){
            reply.code(400)
            throw new Error("space_id is required to specify post.")
        }else{
            const{title,body}=req.body
            const author_id=req.user.id
            const user= await Post.create({
                author_id,
                space_id,
                title,
                body
            })
    
        reply.code(201).send({
            status:'success',
            message:"New post created.",
            data:user
        })
        }
      
    } catch (error) {
        reply.code(500).send({
          status:"error",
          message:error.message  
        })
    }
}

module.exports={
    createPost
}