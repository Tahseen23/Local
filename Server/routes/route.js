const {login, workerSignUp, clientSignUp} =require('../Controllers/AuthControllers.js')
const {getDetails}=require('../Controllers/getDetails.js')
const upload=require('../Middleware/multer.js')

const router=require('express').Router()

router.post('/login',login)

router.route('/signup=clinet').post(
  upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]),
  clientSignUp
);

router.route('/signup=worker').post(
  upload.fields([
    {
        name: "image",
        maxCount: 1
    }
]),
  workerSignUp
);
router.route('/user/:email').get(getDetails)
module.exports=router