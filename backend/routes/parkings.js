const express = require('express');
const router = express.Router();
const parkingService = require('../services/parkings');

router.get('/', (req, res) => {
  parkingService.getParkingsData()
    .then(parkings => res.send(parkings))
    .catch(err => res.status(401).send(err));
});

module.exports = router;
