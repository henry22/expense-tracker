const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')
const {authenticated} = require('../config/auth')

// 列出所有records
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

// 新增一筆record頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 顯示一筆record詳細頁面
router.get('/:id', authenticated, (req, res) => {
  res.send('Show one record detail page')
})

// 新增一筆record
router.post('/', authenticated, (req, res) => {
  const { name, category, date, amount } = req.body

  const newRecord = new Record({
    name: name,
    category: category,
    date: date,
    amount: amount,
    userId: req.user._id
  })

  newRecord.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改一筆record頁面
router.get('/:id/edit', authenticated, (req, res) => {
  const recordId = req.params.id

  Record.findOne({_id: recordId, userId: req.user._id})
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err)
      record.date = moment(record.date).format('YYYY/MM/DD')
      return res.render('edit', {record: record})
    })
})

// 修改一筆record
router.put('/:id', authenticated, (req, res) => {
  const { name, category, date, amount } = req.body
  const recordId = req.params.id

  Record.findOne({_id: recordId, userId: req.user._id}, (err, record) => {
    if (err) return console.error(err)

    record.name = name
    record.category = category
    record.date = date
    record.amount = amount

    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 刪除一筆record
router.delete('/:id', authenticated, (req, res) => {
  const recordId = req.params.id

  Record.findOne({_id: recordId, userId: req.user._id}, (err, record) => {
    if (err) return console.error(err)

    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router