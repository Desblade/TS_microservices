const express = require('express');
const { loginValidation } = require('../validations/loginValidation');
const { checkTokenMiddleware } = require('../middlewares/checkToken');
const { controllerUpdateToken } = require('../controllers/controllerUpdateToken');
const { registerValidation } = require('../validations/registerValidation');
const { controllerRegisterUser } = require('../controllers/controllerRegisterUser');
const { controllerLoginUser } = require('../controllers/controllerLoginUser');

const router = express.Router();

router
  .post('/registerUser', registerValidation, controllerRegisterUser)
  .post('/loginUser', loginValidation, controllerLoginUser)
  .get('/checkTokenUser', checkTokenMiddleware, controllerUpdateToken);

module.exports = router;
