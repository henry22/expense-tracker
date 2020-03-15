const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 列出所有records
router.get('/', (req, res) => {
  res.send('List all records')
})

// 新增一筆record頁面
router.get('/new', (req, res) => {
  res.render('new')
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
    res.redirect('/')
  })
})

// 修改一筆record頁面
router.get('/:id/edit', (req, res) => {
  res.send('Edit one record page')
})

// 修改一筆record
router.put('/:id', (req, res) => {
  res.send('Update one record')
})

// 刪除一筆record
router.delete('/:id/delete', (req, res) => {
  res.send('Delete one record')
})

module.exports = router