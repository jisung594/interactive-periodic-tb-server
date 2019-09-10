const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Element = require('./models/element.js');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb+srv://jisung594:Korea123$@cluster0-3iput.mongodb.net/test?retryWrites=true&w=majority';

// mongoimport --uri "mongodb://root:Korea123$@atlas-host1:27017,atlas-host2:27017,atlas-host3:27017/periodic-table?ssl=true&replicaSet=myAtlasRS&authSource=admin" --collection elements --drop --file ./PeriodicTableJSON.json



// connects our backend code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// GET method
// this method fetches all available data in our database
router.get('/getElements', (req, res) => {
  Element.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// UPDATE method
// this method overwrites existing data in our database
router.post('/updateElement', (req, res) => {
  const { id, update } = req.body;
  Element.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// DELETE method
// this method removes existing data in our database
router.delete('/deleteElement', (req, res) => {
  const { id } = req.body;
  Element.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// CREATE method
// this method adds new data in our database
router.post('/addElement', (req, res) => {
  let data = new Element();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
