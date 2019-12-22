const express = require('express');
const rootRouter = express.Router();

const parkingsRouter = require('./parkings');

rootRouter.use('/parkings', parkingsRouter);

module.exports = rootRouter;
