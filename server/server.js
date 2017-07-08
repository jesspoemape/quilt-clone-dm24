const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const sessions = require('express-sessions');
const config = require('./../config.json');
const sc = require('./../controllers/setController');

const app = module.exports = express();
app.use(bodyParser.json());

const connectionString = config.connectionString;
massive(connectionString).then(dbInstance => app.set('db', dbInstance));

// =========== ENDPOINTS ===========
app.get('/api/sets/:id', sc.getSets);
app.post('/api/sets', sc.addSets);

app.listen(3000, () => console.log("Listening on port 3000"));