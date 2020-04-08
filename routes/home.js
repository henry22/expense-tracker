const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const moment = require('moment')
const sum = require('../public/js/sum')
const replaceIcon = require('../public/js/replaceIcon')
const {authenticated} = require('../config/auth')
const {Op} = require('sequelize')

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
    selectCategory.date = {
      $regex: `/${month}/`
    }
  } else {
    dropdownMonthText = '全部'
  }

  User.findByPk(req.user.id)
    .then(user => {
      if(!user) throw new Error('user not found')

      return Record.findAll({
        where: {
          UserId: req.user.id,
          date: {
            [Op.gte]: new Date(),
            [Op.lte]: new Date(new Date() - 24 * 60 * 60 * 1000)
          }
        }
      })
      .then(records => {
        const isEmpty = records.length > 0 ? false : true
        console.log('records', records)
        let totalAmount = sum(records)

        records.forEach(record => {
          record.category = replaceIcon(record.category)
        })

        res.render('index', { records: records, dropdownText: dropdownText, dropdownMonthText: dropdownMonthText, totalAmount: totalAmount, queryMonth: month, queryCategory: category, isEmpty: isEmpty })
      })
    })
})

module.exports = router