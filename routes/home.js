const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')
const sum = require('../public/js/sum')
const replaceIcon = require('../public/js/replaceIcon')
const {authenticated} = require('../config/auth')

// Index 頁面/首頁
router.get('/', authenticated, (req, res) => {
  let dropdownText = '類別'
  const category = req.query.category
  const selectCategory = {}

  if (category) {
    selectCategory.category = category
    dropdownText = category
  } else {
    dropdownText = '全部'
  }

  Record.find({userId: req.user._id})
    .find(selectCategory)
    .lean()
    .exec((err, records) => {
      if (err) console.error(err)
      let totalAmount = sum(records)

      records.forEach(record => {
        record.date = moment(record.date).format('YYYY/MM/DD')
        record.category = replaceIcon(record.category)
      })
      res.render('index', {records: records, dropdownText: dropdownText, totalAmount: totalAmount})
    })
})

module.exports = router