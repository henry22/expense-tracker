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
  let dropdownMonthText = '月份'
  const category = req.query.category
  const month = req.query.month
  const selectCategory = {}
  const months = {
    '01': '一月',
    '02': '二月',
    '03': '三月',
    '04': '四月',
    '05': '五月',
    '06': '六月',
    '07': '七月',
    '08': '八月',
    '09': '九月',
    '10': '十月',
    '11': '十一月',
    '12': '十二月'
  }

  if (category) {
    selectCategory.category = category
    dropdownText = category
  } else {
    dropdownText = '全部'
  }

  if(month) {
    dropdownMonthText = months[month]
  } else {
    dropdownMonthText = '全部'
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

      res.render('index', { records: records, dropdownText: dropdownText, dropdownMonthText: dropdownMonthText, totalAmount: totalAmount, queryMonth: month, queryCategory: category})
    })
})

module.exports = router