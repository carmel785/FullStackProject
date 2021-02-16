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

///////////////////////////////////////////////////////////////
//* FROM FRONT TO BACK ROUTES

//create subscription from front to DB
router.get('/addSubscription/:movieName/:date/:memberId',async function(req, res, next) {
  console.log(req.params.movieName+",   "+req.params.date+",     "+req.params.memberId)
  var subscriptionToDB = await subscriptionBL.addSubscription(req.params.movieName,req.params.date,req.params.memberId)
  res.send(subscriptionToDB)
});

//add member from FrontEnd to DB
router.get('/addMember/:Name/:Email/:City',async function(req, res, next) {
  console.log(req.params.Name+",   "+req.params.Email+",     "+req.params.City)
  var memberToDB = await membersBL.addMember(req.params.Name,req.params.Email,req.params.City)
  res.send(memberToDB)
});

//delete member from front in DB
router.delete('/deleteMember/:id',async function(req, res, next) {
  console.log(req.params.id)
 await membersBL.deleteMemberInDB(req.params.id)
});

//Update member from front in DB
router.put('/editMember/:id',async function(req, res, next) {
  console.log(req.params.id)
  console.log(req.body)
  res.send(req.body)

 await membersBL.editMemberInDB(req.body,req.params.id)
});

//delete subscriptions from front in DB
router.delete('/deleteSubscriptions/:id',async function(req, res, next) {
  console.log("from subscriptions  "+req.params.id)
 await subscriptionBL.deleteSubscriptionsFromDB(req.params.id)
});


//add movie from FrontEnd to DB
router.post('/addMovie',async function(req, res, next) {
  res.send(req.body)
  var memberToDB = await moviesBL.addMovieToDB(req.body)
});

//Update movie from front in DB
router.put('/editMovie/:id',async function(req, res, next) {
  console.log(req.params.id)
  console.log(req.body)
  res.send(req.body)

 await moviesBL.editMovieInDB(req.body,req.params.id)
});

//delete Movie from front in DB
router.delete('/deleteMovie/:id',async function(req, res, next) {
  console.log("from deleteMovie  "+req.params.id)
  await moviesBL.deleteMovie(req.params.id)  
});

//delete specific movie from subscriptions database from front in DB
router.put('/editSubscription/:id',async function(req, res, next) {
 await subscriptionBL.editSubscription(req.body,req.params.id)
});

module.exports = router;
