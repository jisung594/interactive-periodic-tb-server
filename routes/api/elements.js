const express = require('express')
const router = express.Router()
let Element = require('../../models/element.js')

var mongoose = require('mongoose')

router.get('/', (req,res,error) => {
  console.log("I received a GET request");

  Element.find()
    .then(data => res.json(data))
    .catch(console.log(error))
})

module.exports = router;
