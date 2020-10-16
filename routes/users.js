const express = require('express');
const {
  validateUserBody,
} = require('../middlewares/validations.js');
const {
  getUser,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/me', validateUserBody, getUser);

module.exports = userRouter;
