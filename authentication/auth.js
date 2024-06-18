const jwt=require('jsonwebtoken')


const authenticate=async (req,res,next)=>{
    //take token from cookie
    const cookie=req.cookies.token
    if(!cookie){
        return res.status(401).json({message:"unauthorized"})
    }
    try{
        var decoded=await jwt.verify(cookie,'chedy')
        // console.log(decoded)
        req.user={
            username:decoded.username,
            id:decoded.id
        }
        next()

    }catch(err){console.log(err)
        return res.status(401).send('Invalid token'); 
    }
    
}



module.exports=authenticate