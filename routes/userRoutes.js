const express= require("express")

const router =express.Router()

const{
    getContact,
    getContacts,
    createContacts,
    updateContact,
    deleteContact,
    signin,
    currentUser
}=require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");



router.route('/getallusers').get(getContacts)

router.route('/getuserbyid/:id').get(getContact)

router.route('/register').post(createContacts)
router.route('/signin').post(signin)
router.route('/updateuser/:id').put(updateContact)

router.route('/deleteuser/:id').delete(deleteContact)
router.get("/getCurrentUser",validateToken, currentUser)

 module.exports=router