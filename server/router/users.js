const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get("/profile", auth(), authController.getProfile);
router.put('/profile', auth(),authController.editProfileInfo);
router.get("/profile/:userId", auth(), authController.getProfileInfo);
module.exports = router