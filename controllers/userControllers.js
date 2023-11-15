const User = require('../models/User');

const { createJWT } = require('../services/jwtAuth');
const { hashPassword, verifyPassword } = require('../utils/hashPassword');

const getUserHandler = async (req, res) => {
   let { user } = req;

   return res.status(200).json({ message: 'User found', user });
};

const authenticate = async (req, res) => {
   let { email, password } = req.body;

   // missing input from frontend
   if (!email || !password) {
      return res.status(400).json({ message: 'Missing Credentials' });
   }

   // get user from db
   let { user, err } = await User.getUser(email);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   // user unregistered
   if (user.id == 0) {
      return res.status(400).json({ message: 'User not registered' });
   }

   // password check
   let isMatch = verifyPassword(password, user.password);

   if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
   }

   let token = createJWT(email);

   return res.status(200).json({
      message: 'Authentication Successful',
      token: token,
      user: user
   });
};

const registerUser = async (req, res) => {
   let { email, password } = req.body;

   // missing input from frontend
   if (!email || !password) {
      return res.status(400).json({ message: 'Missing User Information' });
   }

   const { user, err: error } = await User.getUser(email);

   if (error) {
      // error during db query
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
   }
   if (user.id != 0) {
      // already account exists with that email
      return res.status(400).json({ message: 'User already exists' });
   }

   // secure pass
   let pass = hashPassword(password);

   // create user account
   let { userID, err } = await User.createUser({ email, pass });

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   } else if (!userID) {
      return res.status(500).json({ message: 'Something went wrong' });
   }

   return res.status(201).json({ message: 'Registration Successful', token: createJWT(email), user: user });
};

module.exports = {
   getUserHandler,
   registerUser,
   authenticate,
};
