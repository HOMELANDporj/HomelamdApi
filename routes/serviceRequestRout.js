const express = require("express");
const router = express.Router();
const { requestService } = require("../controllers/serviceController");
const validateToken = require("../middleware/validateTokenHandler");

// POST request to create a service request
router.post('/requestService', validateToken, requestService);

module.exports = router;
