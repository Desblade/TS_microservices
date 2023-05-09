const express = require('express');
const articleRouter = require('./articleRouter');

const router = express.Router();

router.use(articleRouter);

module.exports = router;
