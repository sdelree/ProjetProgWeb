const express = require('express');
const rootRouter = express.Router();

const parkingsRouter = require('./parkings');
const vehicleRouter = require('./vehicles');
const authenticationRouter = require('./authentication');

rootRouter.use('/parkings', parkingsRouter);
rootRouter.use('/vehicles', vehicleRouter);
rootRouter.use('/users', authenticationRouter);

module.exports = rootRouter;
