const express = require('express')
const router = express.Router()
const membersBL = require('../BL/membersBL')
const moviesBL = require('../BL/moviesBL')
const subscriptionBL = require('../BL/subscriptionBL')


//* DATA BASE FROM CINEMA WS:

//pass members to Cinema WS (and after that it will pass to the Front End)
router.get('/membersToWS',async function(req, res, next) {
  var membersToWS = await membersBL.getAllMembers()
  res.send(membersToWS)
});

//pass Movies to Cinema WS (and after that it will pass to the Front End)
router.get('/moviesToWS',async function(req, res, next) {
  var moviesToWS = await moviesBL.getAllMovies()
  res.send(moviesToWS)
});

//pass subscription to Cinema WS (and after that it will pass to the Front End)
router.get('/subscriptionToWS',async function(req, res, next) {
  var subscriptionToWS = await subscriptionBL.getSubscription()
  res.send(subscriptionToWS)
});



module.exports = router;
