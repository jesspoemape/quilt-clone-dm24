const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const sessions = require('express-sessions');
const config = require('./../config.json');
const sc = require('./../controllers/setController');
const cors = require('cors');

const app = module.exports = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));

const connectionString = config.connectionString;
massive(connectionString).then(dbInstance => app.set('db', dbInstance)).catch(console.error);

// =========== ENDPOINTS ===========
// app.get('/api/sets/:id', sc.getSets);
// app.post('/api/sets', sc.addSets);

app.post('/api/add-set', sc.addSet);
app.get('/api/get-set-info/:id', sc.getSetInfo);
app.get('/api/get-cards/:id', sc.getCards);

app.listen(3001, () => console.log("Listening on port 3001"));