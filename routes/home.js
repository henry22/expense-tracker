const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// Index 頁面/首頁
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) console.error(err)
      res.render('index', {records: records})
    })
})

module.exports = router