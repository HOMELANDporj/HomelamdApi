const express = require('express');
const router = express.Router();
const {
    createCarOwner,
    getAllCarOwners,
    deleteCarOwner,
    updateCarOwner 

} = require('../controllers/carownerController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/createCarOwner',validateToken,createCarOwner);
router.get('/getcarowner',validateToken,getAllCarOwners);
router.delete('/deletecarowner/:id',validateToken,deleteCarOwner);
router.put('updatecarowner/:id', validateToken,updateCarOwner );
module.exports = router;