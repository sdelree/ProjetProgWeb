const express = require('express');
const router = express.Router();
const vehiclesService = require('../services/vehicles');


// GETS
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.session.user._id;
  vehiclesService.getVehiclesById(id)
                 .then(vehicle =>{
                        if(vehicle.userId == userId) {
                          res.send(vehicle)
                        }
                        else{
                          return Promise.reject('The connected user is not the vehicle\'s owner');
                        }
                  })
                 .catch(err => res.status(401).send(err));
});

router.get('/', (req, res) => {

  const userId = req.session.user._id;
  vehiclesService.getVehiclesByOwner(userId)
                 .then(vehicle => res.send(vehicle))
                 .catch(err => res.status(401).send(err));
});

router.get('/:vehicleId', (req, res) => {

  const vehicleId = req.params.vehicleId;
  vehiclesService.getVehiclesById(vehicleId)
                 .then(vehicle=>res.send(vehicle))
                 .catch(err => res.status(401).send(err));
});


router.get('/:vehicleName', (req, res) => {
  // TODO : la aussi faudrait verifier que le user authentifié est bien le propriétaire du vehicule
  const vehicleName = req.params.vehicleName;
  vehiclesService.getVehiclesByName(vehicleName)
                 .then(vehicle=>res.send(vehicle))
                 .catch(err => res.status(401).send(err));
});

// CREATE
router.post('/create', (req, res) =>{
  // TODO : récuperer l'id du user Authentifié
  const userId =1;
  const isElectric = req.body.isElectric;
  const height = req.body.height;

  vehiclesService.createVehicle(userId, isElectric, height)
                 .then(vehicle=>res.send(vehicle))
                 .catch(err => res.status(401).send(err));
});
// UPDATE
router.put('/updateType/:vehicleId', (req, res) =>{
  const vehicleToUpdate = req.params.vahicleId;
  const isElectric = req.body.isElectric;

  vehiclesService.getVehiclesById(vehicleToUpdate)
      .then(vehicle => {
        vehiclesService.updateTypeVehicle(vehicle._id, isElectric)
            .then(updatedVehicle=>res.send(updatedVehicle))
            .catch(err => res.status(401).send(err));
      })
      .catch(err => res.status(401).send(err));
});

router.put('/updateHeight/:vehicleId', (req, res) =>{
  const vehicleToUpdate = req.params.vahicleId;
  const height = req.body.height;

  vehiclesService.getVehiclesById(vehicleToUpdate)
      .then(vehicle => {
        vehiclesService.updateHeightVehicle(vehicle._id, height)
            .then(updatedVehicle=>res.send(updatedVehicle))
            .catch(err => res.status(401).send(err));
       })
      .catch(err => res.status(401).send(err));
});
// DELETE
router.put('/delete/:vehicleId', (req, res) =>{
  const vehicleToUpdate = req.params.vahicleId;
  vehiclesService.getVehiclesById(vehicleToUpdate)
      .then(vehicle => {
        vehiclesService.deleteVehicle(vehicle._id)
            .then(updatedVehicle=>res.send(updatedVehicle))
            .catch(err => res.status(401).send(err));
      })
      .catch(err => res.status(401).send(err));
});
module.exports = router;
