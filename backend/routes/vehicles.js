const express = require('express');
const router = express.Router();
const vehiclesService = require('../services/vehicles');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  vehiclesService.getVehiclesById(id).then(vehicle => res.send(vehicle));
});

router.get('/', (req, res) => {
  //TODO Tester si le user authentifié est bien le propriétaire du véhicule
  const userId = 1;
  vehiclesService.getVehiclesByOwner(userId).then(vehicle => res.send(vehicle));
});


router.get('/:vehicleId', (req, res) => {
  //TODO : la aussi faudrait verifier que le user authentifié est bien le propriétaire du vehicule
  const vehicleId = req.params.vehicleId;
  vehiclesService.getVehiclesById(vehicleId).then(vehicle=>res.send(vehicle));
});
//userId, isElectric, height
route.get('/:isElectric/:height', (req,res) =>{
  //TODO : récuperer l'id du user Authentifié
  const userId =1;
  const isElectric = req.params.isElectric;
  const height = req.params.height;

  vehiclesService.createVehicle(userId, isElectric, height);
});
module.exports = router;



