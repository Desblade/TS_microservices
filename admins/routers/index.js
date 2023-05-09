const express = require('express');
const adminRouter = require('./adminRouter');

const router = express.Router();

router.use(adminRouter);

module.exports = router;
