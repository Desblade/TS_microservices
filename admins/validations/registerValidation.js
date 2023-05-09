const { body } = require('express-validator');

const registerValidation = [
  body('name')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 3 }),
  body('surname')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 5 }),
  body('login')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 5 }),
  body('password')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 5 }),
];

module.exports = {
  registerValidation,
};
