const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')
const sum = require('../public/js/sum')

// Index 頁面/首頁
router.get('/', (req, res) => {
  let dropdownText = '類別'
  const category = req.query.category
  const selectCategory = {}

  if (category) {
    selectCategory.category = category
    dropdownText = category
  } else {
    dropdownText = '全部'
  }

  Record.find(selectCategory)
    .lean()
    .exec((err, records) => {
      if (err) console.error(err)
      let totalAmount = sum(records)

      records.forEach(record => record.date = moment(record.date).format('YYYY/MM/DD'))
      res.render('index', {records: records, dropdownText: dropdownText, totalAmount: totalAmount})
    })
})

module.exports = router