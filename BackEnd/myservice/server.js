var express = require('express');
var cors = require('cors')


var app = express();

app.use(cors())




const bodyParser = require('body-parser');

require('./configs/database');

// configure the body-parser
// to accept urlencoded bodies
// and json data
app.use(bodyParser.urlencoded({ extended: true }))  
   .use(bodyParser.json());

app.use('/api/persons', require('./routes/personsRoute'));


app.listen(8000);