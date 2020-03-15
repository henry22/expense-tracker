const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const moment = require('moment')

// 列出所有records
router.get('/', (req, res) => {
  return res.redirect('/')
})

// 新增一筆record頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 顯示一筆record詳細頁面
router.get('/:id', (req, res) => {
  res.send('Show one record detail page')
})

// 新增一筆record
router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body

  const newRecord = new Record({
    name: name,
    category: category,
    date: date,
    amount: amount
  })

  newRecord.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改一筆record頁面
router.get('/:id/edit', (req, res) => {
  const recordId = req.params.id

  Record.findById(recordId)
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err)
      record.date = moment(record.date).format('YYYY/MM/DD')
      return res.render('edit', {record: record})
    })
})

// 修改一筆record
router.put('/:id', (req, res) => {
  const { name, category, date, amount } = req.body
  const recordId = req.params.id

  Record.findById(recordId, (err, record) => {
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
router.delete('/:id', (req, res) => {
  const recordId = req.params.id

  Record.findById(recordId, (err, record) => {
    if (err) return console.error(err)

    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router