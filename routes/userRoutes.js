const express= require("express")

const router =express.Router()

const{
    getContact,
    getContacts,
    createContacts,
    updateContact,
    deleteContact
}=require("../controllers/userController");



router.route('/').get(getContacts)

router.route('/:id').get(getContact)

router.route('/').post(createContacts)

router.route('/:id').put(updateContact)

router.route('/:id').delete(deleteContact)

 module.exports=router