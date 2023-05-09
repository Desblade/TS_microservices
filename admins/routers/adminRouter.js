const express = require('express');
const { controllerLoginAdmin } = require('../controllers/controllerLoginAdmin');
const { loginValidation } = require('../validations/loginValidation');
const { checkTokenMiddleware } = require('../middlewares/checkToken');
const { controllerUpdateToken } = require('../controllers/controllerUpdateToken');
const { registerValidation } = require('../validations/registerValidation');
const { controllerRegisterAdmin } = require('../controllers/controllerRegisterAdmin');

const router = express.Router();

router
  .post('/registerAdmin', registerValidation, controllerRegisterAdmin)
  .post('/loginAdmin', loginValidation, controllerLoginAdmin)
  .get('/checkTokenAdmin', checkTokenMiddleware, controllerUpdateToken);

module.exports = router;
