const RoleModel=require('../Models/Role.js')
const workermodel=require('../Models/Workermodel.js')
const clientModel=require('../Models/clientModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  uploadCloud  = require('../utils/cloudnary.js')
const NodeGeocoder = require('node-geocoder');




const workerSignUp=async (req,res)=>{
  try{
    const {name,email,password,occupation,address}=req.body
    const user = await RoleModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    let imageLocation
    let profile=''
    if (req.files && req.files.image && req.files.image.length > 0) {
      imageLocation = req.files.image[0].path; 
      profile = await uploadCloud(imageLocation);
    } 

    

    let latitude
    let longitude
    if (getLocation(address)){
      const location=getLocation(address)
      latitude=location.latitude
      longitude=location.longitude
    }

    const locationUser=[latitude,longitude]

    const workerUser=new RoleModel({email,role:'worker'})
    await workerUser.save()

    const newUser=new workermodel({name,email,password,occupation,image:profile?.url || '',location:locationUser,address})
    await newUser.save()

    return res.status(201).json({ message: 'SignUp success', success: true, profile })

  }catch (err) {
    console.error(err); 
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    });
  }
}


const clientSignUp=async (req,res)=>{
  try{
    const {name,email,password,address}=req.body
    const user = await RoleModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    let imageLocation
    let profile=''
    if (req.files && req.files.image && req.files.image.length > 0) {
      imageLocation = req.files.image[0].path; 
      profile = await uploadCloud(imageLocation);
    } 

    

    let latitude
    let longitude
    if (getLocation(address)){
      const location=getLocation(address)
      latitude=location.latitude
      longitude=location.longitude
    }

    const locationUser=[latitude,longitude]
    const clientUser=new RoleModel({name,role:'client'})
    await clientUser.save()

    const newUser=new clientModel({name,email,password,image:profile?.url || '',location:locationUser,address})
    await newUser.save()

    return res.status(201).json({ message: 'SignUp success', success: true, profile })

  }catch (err) {
    console.error(err); 
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    });
  }
}



const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await RoleModel.findOne({ email })
    const errorMsg = 'Auth failed email or password is wrong'
    if (!user) {
      return res.status(400).json({message:errorMsg,sucess:false})
    }
    if (user.role==='client'){
      user=await clientModel.findOne({email})
    }else if (user.role==='worker'){
      user=await workermodel.findOne({email})
    }
    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, sucess: false })
    }
    const profile=user.image
    const jwtToken = jwt.sign({ email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    const name = user.name
    res.status(200).json({ message: 'Login sucesss', sucess: true, jwtToken, email, password, name,profile })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      sucess: false
    })

  }
}

async function getLocation(address) {
  const options = {
    provider: 'openstreetmap', // OpenStreetMap provider
    httpAdapter: 'https', // Use HTTPS for requests
    formatter: null, // Optional formatter
    userAgent: 'MyApp/1.0' // Set a custom user-agent to identify your application
  };

  const geocoder = NodeGeocoder(options);

  try {
    const res = await geocoder.geocode(address);
    if (res.length > 0) {
      const latitude = res[0].latitude;
      const longitude = res[0].longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      return { latitude, longitude };
    } else {
      console.log('No location data found');
      return false;
    }
  } catch (err) {
    console.log('Error:', err);
    return false;
  }
}

module.exports={
  login,
  workerSignUp,
  clientSignUp
}