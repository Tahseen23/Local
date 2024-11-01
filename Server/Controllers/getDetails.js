const RoleModel = require('../Models/Role.js')
const workermodel = require('../Models/Workermodel.js')
const clientModel = require('../Models/clientModel.js')


const getDetails=async(req,res)=>{

  const email = req.params.email + '@gmail.com'
  let user=await RoleModel.findOne({email})

  if (user.role === 'client') {
    user = await clientModel.findOne({ email })
  } else if (user.role === 'worker') {
    user = await workermodel.findOne({ email })
  }
  console.log(email)
  return res.status(200).json({user})

}

module.exports={getDetails}