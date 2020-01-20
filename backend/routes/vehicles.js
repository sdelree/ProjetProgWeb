const express = require('express');
const router = express.Router();
const vehiclesService = require('../services/vehicles');

router.use('/*', (req, res, next) => req.user ? next() : res.status(401).end());

// GET ALL BY OWNER
router.get('/', (req, res) => {
  const userId = req.user._id.toString();
  vehiclesService.getVehiclesByOwner(userId)
    .then(vehicles => res.send(vehicles))
    .catch(err => res.status(500).end());
});

// CREATE
router.post('/', (req, res) => {
  const userId = req.user._id.toString();
  const {isElectric, height, name} = req.body;

  vehiclesService.createVehicle(userId, name, isElectric, height)
    .then(vehicle => res.status(201).send(vehicle))
    .catch(err => res.status(500).end());
});

// GET BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user._id.toString();
  vehiclesService.getVehicleById(id)
    .then(vehicle => {
      if (!vehicle) {
        res.status(404).end();
      } else if (vehicle.userId === userId) {
        res.send(vehicle);
      } else {
        res.send(403).end();
      }
    })
    .catch(err => res.status(500).end());
});

router.get('/:vehicleName', (req, res) => {
  const userId = req.user._id.toString();
  const vehicleName = req.params.vehicleName;
  vehiclesService.getVehicleByName(vehicleName)
    .then(vehicle=>{
      if (vehicle.userId === userId) {
        res.send(vehicle);
      } else {
        return Promise.reject(new Error('The connected user is not the vehicle\'s owner'));
      }
    })
    .catch(err => res.status(401).send(err));
});

// UPDATE
router.put('/:id', (req, res) => {
  const userId = req.user._id.toString();
  const id = req.params.id;
  const {isElectric, height, name} = req.body;
  vehiclesService.getVehicleById(id)
    .then(vehicle => {
      if (!vehicle) {
        res.status(404).end();
      } else if (vehicle.userId === userId) {
        vehiclesService.updateVehicle(vehicle._id, {name, isElectric, height})
          .then(updatedVehicle => res.send(updatedVehicle))
          .catch(err => res.status(500).end());
      } else {
        res.send(403).end();
      }
    })
    .catch(err => res.status(500).end());
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user._id.toString();
  vehiclesService.getVehicleById(id)
    .then(vehicle => {
      if (!vehicle) {
        res.status(404).end();
      } else if (vehicle.userId === userId) {
        vehiclesService.deleteVehicle(vehicle._id)
          .then(_ => res.status(204).send())
          .catch(err => res.status(500).end());
      } else {
        res.status(403).end();
      }
    })
    .catch(err => res.status(500).end());
});

module.exports = router;
