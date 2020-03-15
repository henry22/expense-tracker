const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')

// Index 頁面/首頁
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) console.error(err)
      records.forEach(record => record.date = moment(record.date).format('YYYY/MM/DD'))
      res.render('index', {records: records})
    })
})

module.exports = router