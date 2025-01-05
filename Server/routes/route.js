const {login, workerSignUp, clientSignUp} =require('../Controllers/AuthControllers.js')
const {getDetails,getRole,getHistory,addWorker,getComments,addComments,getJobs,addJob,addComplete,addRatings,getWorker}=require('../Controllers/getDetails.js')
const upload=require('../Middleware/multer.js')
const ensure=require('../Middleware/authMiddle.js')

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
router.route('/user/:username').get(ensure,getDetails)
router.route('/role/:username').get(ensure,getRole)
router.route('/role/history/:username').get(ensure,getHistory)
router.route('/role/comments/:username').get(ensure,getComments)
router.route('/role/jobs/:username').get(ensure,getJobs)
router.route('/role/jobs/:job/:location').get(ensure,getWorker)
router.route('/role/addWorker').put(ensure,addWorker)
router.route('/role/addComments').put(ensure,addComments)
router.route('/role/addjobs').put(ensure,addJob)
router.route('/role/addComplete').put(ensure,addComplete)
router.route('/role/addRatings').put(ensure,addRatings)
module.exports=router