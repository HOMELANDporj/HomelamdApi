const express= require("express")

const router =express.Router()

const{
   
    signin,
    currentUser,
    getAllUsers,
    getUserById,
    registerUser,
    updateUserProfile,
    deleteUser
}=require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");



router.route('/getallusers').get(getAllUsers)

router.route('/getuserbyid/:id').get(getUserById)

router.route('/register').post(registerUser)
router.route('/signin').post(signin)
router.route('/updateuser/:id').put(updateUserProfile)

router.route('/deleteuser/:id').delete(deleteUser)
router.get("/getCurrentUser",validateToken, currentUser)

 module.exports=router