const express = require('express');
const { checkTokenMiddleware } = require('../middlewares/checkToken');
const { createArticleValidation } = require('../validations/createArticleValidation');
const { controllerCreateArticle } = require('../controllers/controllerCreateArticle');
const { controllerUpdateArticle } = require('../controllers/controllerUpdateArticle');
const { controllerDeleteArticle } = require('../controllers/controllerDeleteArticle');

const router = express.Router();

router
  .use(checkTokenMiddleware)
  .route('/')
  .post(createArticleValidation, controllerCreateArticle)
  .patch(controllerUpdateArticle)
  .delete(controllerDeleteArticle);

module.exports = router;
