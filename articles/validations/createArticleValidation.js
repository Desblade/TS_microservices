const { body } = require('express-validator');

const createArticleValidation = [
  body('title')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 5 }),
  body('description')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 5 }),
];

module.exports = {
  createArticleValidation,
};
