var express = require('express');
var router = express.Router();

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");

const User = require('../models/User');
const Trip = require('../models/Trip');

router.post('/new-trip', isLoggedIn(), (req, res, next) => {
    
  const { name, traveler, initdate } = req.body;
  const currUser = req.session.currentUser._id;

  Trip
    .create({ name, traveler, initdate })
    .then(newTrip => {
      const tripId = newTrip._id;
      User.findByIdAndUpdate(
        currUser,
        { $push: { createdtrips: tripId} },
        { new: true }
      )
      .then((user) => {
        console.log(user);
      })
      .catch(error => {
        console.log(error);
      });
    })
    //.status(200) 
    //.json(newTrip)
    .catch(error => {
      console.log('Error while create the trip: ', error);
    });
})

router.post('/:id/edit', isLoggedIn(), (req, res, next) => {
  
  const { name, initdate } = req.body;

  Trip
    .findByIdAndUpdate(
      req.params.id,
      { $set: { name, initdate } },
      { new: true }
    )
    .then( (tripUpdate) => {
      console.log(tripUpdate);
    })
    .catch(error => {
      console.log('Error while retrieving trip details: ', error);
  })
});

router.post('/:id/delete', isLoggedIn(), (req, res, params) => {

  const currUser = req.session.currentUser._id;

  Trip
    .findByIdAndDelete(req.params.id)
    .then(delTrip => {

      User
        .findByIdAndUpdate(
          currUser,
          { $pull: { createdtrips: delTrip._id } },
          { new: true }
        )
        .then((user) => {
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
});



module.exports = router;