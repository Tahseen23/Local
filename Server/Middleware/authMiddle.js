const jwt=require('jsonwebtoken')
const ensure=(req,res,next)=>{
  const auth=req.headers['authorization']
  console.log(auth)
  if (!auth){
    return res.status(403).json({message:'Unauthorized JWT'})
  }
  try{
    const token=auth.split(' ')[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    next()
  }catch(err){
    return res.status(403).json({message:'Unauthorized JWT expired'})
  }
}

module.exports=ensure