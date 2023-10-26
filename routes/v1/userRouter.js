const express = require('express');

const router = express.Router();

const { registerUser, authenticate, getUserHandler } = require('../../controllers/userControllers');

const tokenAuth = require('../../middlewares/tokenAuth');
const { validateRegisterUser } = require('../../validations/userValidations');

router
   .get('/', tokenAuth, getUserHandler)
   .post('/register', validateRegisterUser, registerUser)
   .post('/authenticate', authenticate)

module.exports = router;
