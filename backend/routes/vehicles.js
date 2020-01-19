const express = require('express');
const router = express.Router();
const vehiclesService = require('../services/vehicles');


// GETS
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.session.user._id;
  vehiclesService.getVehiclesById(id)
                 .then(vehicle =>{
                        if(vehicle.userId === userId) {
                          res.send(vehicle);
                        }
                        else{
                          return Promise.reject('The connected user is not the vehicle\'s owner');
                        }
                  })
                 .catch(err => res.status(401).send(err));
});
// GET OWNER BY ID
router.get('/', (req, res) => {
  const userId = req.session.user._id;
  vehiclesService.getVehiclesByOwner(userId)
                 .then(vehicle => res.send(vehicle))
                 .catch(err => res.status(401).send(err));
});
// GET VEHICLE BY ID
router.get('/:vehicleId', (req, res) => {

  const vehicleId = req.params.vehicleId;
  vehiclesService.getVehiclesById(vehicleId)
                 .then(vehicle=>res.send(vehicle))
                 .catch(err => res.status(401).send(err));
});


router.get('/:vehicleName', (req, res) => {
  const userId = req.session.user._id;
  const vehicleName = req.params.vehicleName;
  vehiclesService.getVehiclesByName(vehicleName)
                 .then(vehicle=>{
                              if(vehicle.userId === userId) {
                                res.send(vehicle);
                              }
                              else {
                                return Promise.reject('The connected user is not the vehicle\'s owner');
                              }
                        })
                 .catch(err => res.status(401).send(err));
});

// CREATE
router.post('/create', (req, res) =>{
  const userId =req.session.user._id;
  const isElectric = req.body.isElectric;
  const height = req.body.height;
  const name = req.body.name;

  vehiclesService.getVehiclesByName(userId, name)
                 .then(vehicle => {
                        if(vehicle === null){
                          vehiclesService.createVehicle(userId, name, isElectric, height)
                                         .then(vehicle=>res.send(vehicle))
                                         .catch(err => res.status(401).send(err));
                        } else {
                          return Promise.reject('This vehicle already exists');
                        }
                 })
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
  const isElectric = req.body.isElectric;

  vehiclesService.getVehiclesById(vehicleToUpdate)
      .then(vehicle => {
        vehiclesService.updateVehicle(vehicle._id, {isElectric, height})
                       .then(updatedVehicle=>res.send(updatedVehicle))
                       .catch(err => res.status(401).send(err));
       })
      .catch(err => res.status(401).send(err));
});
// DELETE
router.delete('/delete/:vehicleId', (req, res) =>{
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
