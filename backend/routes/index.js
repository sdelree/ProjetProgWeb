const express = require('express');
const rootRouter = express.Router();

const parkingsRouter = require('./parkings');
const vehicleRouter = require('./vehicles');

rootRouter.use('/parkings', parkingsRouter);
rootRouter.use('/vehicles', vehicleRouter);

module.exports = rootRouter;
