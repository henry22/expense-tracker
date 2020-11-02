const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const moment = require('moment')
const sum = require('../public/js/sum')
const replaceIcon = require('../public/js/replaceIcon')
const {authenticated} = require('../config/auth')
const sequelize = require('sequelize')

// Index 頁面/首頁
router.get('/', authenticated, (req, res) => {
  let dropdownText = '類別'
  let dropdownMonthText = '月份'
  const category = req.query.category
  const month = req.query.month
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

  let querySelect = {
    raw: true,
    nest: true,
    where: {
      UserId: req.user.id
    },
    order: [['date', 'DESC']]
  }

  if(category && month) {
    querySelect = {
      raw: true,
      nest: true,
      where: { 
        $and: sequelize.where(sequelize.fn("month", sequelize.col("date")), month),
        category: category
      }
    }

    dropdownText = category
    dropdownMonthText = months[month]
  }  else if(category) {
    querySelect = {
      raw: true,
      nest: true,
      where: {
        category: category
      }
    }

    dropdownText = category
  } else if(month) {
    querySelect = {
      raw: true,
      nest: true,
      where: {
        $and: sequelize.where(sequelize.fn("month", sequelize.col("date")), month)
      }
    }

    dropdownMonthText = months[month]
  } else {
    dropdownText = '全部'
    dropdownMonthText = '全部'
  }

  User.findByPk(req.user.id)
    .then(user => {
      if(!user) throw new Error('user not found')

      return Record.findAll(querySelect)
      .then(records => {
        const isEmpty = records.length > 0 ? false : true

        let totalAmount = sum(records)

        records.forEach(record => {
          record.category = replaceIcon(record.category)
          record.date = moment(record.date).format('YYYY/MM/DD')
        })

        res.render('index', { records: records, dropdownText: dropdownText, dropdownMonthText: dropdownMonthText, totalAmount: totalAmount, queryMonth: month, queryCategory: category, isEmpty: isEmpty })
      })
    })
})

module.exports = router