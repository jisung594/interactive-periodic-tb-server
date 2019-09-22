const express = require('express')
const router = express.Router()
let Element = require('../../models/element.js')

var mongoose = require('mongoose')


// router.get('/', (req,res) => {
//   console.log("I received a GET request");
//
//   Element.find()
//     .then(data => res.json(data))
//     .catch(error)
//
//   // mongoose.connect(process.env.MONGODB_URI)
//   //
//   // let db = mongoose.connection
//   // db.elements.find()
//   //   .then(data => res.json(data))
//
// })


router.get('/', async (req, res) => {
    try {
        const elements = await Element.find({});

        return res.json({
            elements
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }     
});


module.exports = router;
