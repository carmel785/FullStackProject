var express = require('express');
var router = express.Router();
var indexBl = require('../bl/indexBl')
var usersBl = require('../bl/usersBl')
var usersDal = require('../dals/usersDal')
var permissionsDal = require('../dals/permissionsDal')
var adminDal = require('../dals/AdminDal')
var axios = require('axios')
//* DATA BASE FROM CINEMA WS:

//pass users DataBase to FrontEnd
router.get('/UsersDB',async function(req, res, next) {
  var usersDB = await usersBl.getUsersFromDB()
  res.send(usersDB)
});
//pass users DataBase(with permissions and created date..) to FrontEnd
router.get('/UsersDBFullData',async function(req, res, next) {
  var usersDB = await usersBl.getAllUserDetails()
  res.send(usersDB)
});
//update(PUT) the users DB and jsons
router.put('/UsersDB/:id',async function(req, res, next) {
  res.send(req.body)
  // console.log(req.params.id)
  usersBl.updateUser(req.body)
});

//delete user in Json and data base
router.get('/deleteUser/:user',async function(req, res, next) {
  await usersBl.deleteUser(req.params.user)
  res.send("user: "+req.params.user+" deleted")
});

//create new user data base and Json
router.post('/createUser',async function(req, res, next) {
  await usersBl.addUser(req.body)
  res.send("user: "+req.body.user+" created")
});

//pass Permissions Json to FrontEnd
router.get('/PermissionsJson',async function(req, res, next) {
  var permissionsJson = await permissionsDal.readFile()
  res.send(permissionsJson)
});

//pass Permissions Json to FrontEnd
router.get('/PermissionsJson',async function(req, res, next) {
  var permissionsJson = await permissionsDal.readFile()
  res.send(permissionsJson)
});

//pass Users Json to FrontEnd
router.get('/UsersJson',async function(req, res, next) {
  var UsersJson = await usersDal.readFile()
  res.send(UsersJson)
});

//pass Admin Json to FrontEnd
router.get('/AdminJson',async function(req, res, next) {
  var AdminJson = await adminDal.readFile()
  res.send(AdminJson)
});


//////////////////////////////////////////////////////////////////
//* DATA BASE FROM SUBSCRIPTIONS WS:

//pass members from WS DB to Cinema WS to FrontEnd
router.get('/membersToClient',async function(req, res, next) {
  var membersToWS = await axios.get('http://localhost:8000/routingToCinemaWS/membersToWS')
  res.send(membersToWS.data)
});

//pass members from WS DB to Cinema WS to FrontEnd
router.get('/moviesToClient',async function(req, res, next) {
  var moviesToWS = await axios.get('http://localhost:8000/routingToCinemaWS/moviesToWS')
  res.send(moviesToWS.data)
});

//pass subscription from WS DB to Cinema WS to FrontEnd
router.get('/subscriptionToClient',async function(req, res, next) {
  var subscriptionToWS = await axios.get('http://localhost:8000/routingToCinemaWS/subscriptionToWS')
  res.send(subscriptionToWS.data)
});

module.exports = router;
