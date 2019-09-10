let PeriodicTable = require('../PeriodicTableJSON.json')
let Element = require('../models/element.js')

let elements = PeriodicTable
let counter = 1

elements.forEach(ele => {
  new Element({
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
