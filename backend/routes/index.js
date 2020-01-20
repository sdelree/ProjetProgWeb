const express = require('express');
const rootRouter = express.Router();

const parkingsRouter = require('./parkings');
const vehicleRouter = require('./vehicles');
const favoriteParkingRouter = require('./favorites');
const authenticationRouter = require('./authentication');

rootRouter.use('/parkings', parkingsRouter);
rootRouter.use('/vehicles', vehicleRouter);
rootRouter.use('/favorisParking', favoriteParkingRouter);
rootRouter.use('/users', authenticationRouter);

module.exports = rootRouter;
