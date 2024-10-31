const RoleModel = require('../Models/Role.js')
const workermodel = require('../Models/Workermodel.js')
const clientModel = require('../Models/clientModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uploadCloud = require('../utils/cloudnary.js')
const axios = require('axios');
const key = process.env.API_KEY




const workerSignUp = async (req, res) => {
  try {
    const { name, email, password, occupation, address } = req.body
    const user = await RoleModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    let imageLocation
    let profile = ''
    if (req.files && req.files.image && req.files.image.length > 0) {
      imageLocation = req.files.image[0].path;
      profile = await uploadCloud(imageLocation);
    }



    console.log(address)
    console.log(getLocation(address))
    console.log(location)

    console.log(email, longitude)

    const locationUser = [latitude, longitude]

    const workerUser = new RoleModel({ email, role: 'worker' })
    await workerUser.save()

    const newUser = new workermodel({ name, email, password, occupation, image: profile?.url || '', location: locationUser, address })
    await newUser.save()

    return res.status(201).json({ message: 'SignUp success', success: true, profile })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false
    });
  }
}


const clientSignUp = async (req, res) => {
  try {
    const { name, email, password, address } = req.body
    const user = await RoleModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    let imageLocation
    let profile = ''
    if (req.files && req.files.image && req.files.image.length > 0) {
      imageLocation = req.files.image[0].path;
      profile = await uploadCloud(imageLocation);
    }



    let latitude
    let longitude
    if (getLocation(address)) {
      const location = getLocation(address)
      latitude = location.latitude
      longitude = location.longitude
    }

    const locationUser = [latitude, longitude]
    const clientUser = new RoleModel({ name, role: 'client' })
    await clientUser.save()

    const newUser = new clientModel({ name, email, password, image: profile?.url || '', location: locationUser, address })
    await newUser.save()

    return res.status(201).json({ message: 'SignUp success', success: true, profile })

  } catch (err) {
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
      return res.status(400).json({ message: errorMsg, sucess: false })
    }
    if (user.role === 'client') {
      user = await clientModel.findOne({ email })
    } else if (user.role === 'worker') {
      user = await workermodel.findOne({ email })
    }
    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, sucess: false })
    }
    const profile = user.image
    const jwtToken = jwt.sign({ email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    const name = user.name
    res.status(200).json({ message: 'Login sucesss', sucess: true, jwtToken, email, password, name, profile })
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      sucess: false
    })

  }
}



async function getLocation(address) {
  const apikey = key; // Make sure to use your LocationIQ API key here
  const url = `https://us1.locationiq.com/v1/search.php?key=${apikey}&q=${encodeURIComponent(address)}&format=json`;

  try {
    const response = await axios.get(url, {
      headers: { accept: 'application/json' }
    });

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      const latitude = location.lat;
      const longitude = location.lon;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      return { latitude, longitude };
    } else {
      console.error('No location data found for the given address.');
      return false;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}


// getLocation('1600 Amphitheatre Parkway, Mountain View, CA');




module.exports = {
  login,
  workerSignUp,
  clientSignUp
}