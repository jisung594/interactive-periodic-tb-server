let PeriodicTable = require('../PeriodicTableJSON.json')
let Element = require('../models/element.js')
let mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/periodic-table')
mongoose.connect('mongodb://jisung594:Korea123$@ds123399.mlab.com:23399/heroku_v1hrw9h7', { useNewUrlParser: true })
let db = mongoose.connection
db.collection('elements').remove({})

let elementsData = PeriodicTable
let counter = 1

let elements = elementsData["elements"].map(ele => {
  return new Element({
    id: ele[counter],
    name: ele["name"],
    symbol: ele["symbol"],
    appearance: ele["appearance"],
    phase: ele["phase"],
    number: ele["number"],
    period: ele["period"],
    density: ele["density"],
    summary: ele["summary"],
    spectral_img: ele["spectral_img"],
    category: ele["category"],
    discovered_by: ele["discovered_by"],
    named_by: ele["named_by"]
  })

  counter++
})


let done = 0;
for (let i = 0; i < elements.length; i++) {
    elements[i].save(function(err, result) {
        done++;
        if (done === elements.length) {
            exit();
        }
    });
}


function exit() {
  mongoose.disconnect()
}
