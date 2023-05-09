const { body } = require('express-validator');

const loginValidation = [
  body('login')
    .exists({ checkFalsy: true })
    .isString(),
  body('password')
    .exists({ checkFalsy: true })
    .isString(),
];

module.exports = {
  loginValidation,
};
