const express = require('express')
const router = express.Router()
let Element = require('../../models/element.js')

router.get('/', (req,res) => {
  console.log("I received a GET request");

  Element.find()
    .then(data => res.json(data))

})


module.exports = router;
