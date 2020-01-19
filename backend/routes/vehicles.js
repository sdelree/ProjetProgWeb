const express = require('express');
const router = express.Router();
const vehiclesService = require('../services/vehicles');


// GETS
router.get('/:id', (req, res) => {
  const id = req.params.id;
  vehiclesService.getVehiclesById(id).then(vehicle => res.send(vehicle));
});

router.get('/', (req, res) => {
  // TODO Tester si le user authentifié est bien le propriétaire du véhicule
  const userId = 1;
  vehiclesService.getVehiclesByOwner(userId).then(vehicle => res.send(vehicle));
});

router.get('/:vehicleId', (req, res) => {
  // TODO : la aussi faudrait verifier que le user authentifié est bien le propriétaire du vehicule
  const vehicleId = req.params.vehicleId;
  vehiclesService.getVehiclesById(vehicleId).then(vehicle=>res.send(vehicle));
});


router.get('/:vehicleName', (req, res) => {
  // TODO : la aussi faudrait verifier que le user authentifié est bien le propriétaire du vehicule
  const vehicleName = req.params.vehicleName;
  vehiclesService.getVehiclesByName(vehicleName).then(vehicle=>res.send(vehicle));
});

// CREATE
router.post('/create', (req, res) =>{
  // TODO : récuperer l'id du user Authentifié
  const userId =1;
  const isElectric = req.body.isElectric;
  const height = req.body.height;

  vehiclesService.createVehicle(userId, isElectric, height).then(vehicle=>res.send(vehicle));
});
// UPDATE
router.put('/updateType/:vehicleId', (req, res) =>{
  const vehicleToUpdate = req.params.vahicleId;
  const isElectric = req.body.isElectric;

  vehiclesService.getVehiclesById(vehicleToUpdate)
      .then(vehicle => {
        vehiclesService.updateTypeVehicle(vehicle._id, isElectric)
                       .then(updatedVehicle=>res.send(updatedVehicle));
      });
});

router.put('/updateHeight/:vehicleId', (req, res) =>{
  const vehicleToUpdate = req.params.vahicleId;
  const height = req.body.height;

  vehiclesService.getVehiclesById(vehicleToUpdate)
      .then(vehicle => {
        vehiclesService.updateHeightVehicle(vehicle._id, height)
                       .then(updatedVehicle=>res.send(updatedVehicle));
      });
});

module.exports = router;
