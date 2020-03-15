const express = require('express')
const router = express.Router()

// 列出所有records
router.get('/', (req, res) => {
  res.send('List all records')
})

// 新增一筆record頁面
router.get('/new', (req, res) => {
  res.send('Add one record page')
})

// 顯示一筆record詳細頁面
router.get('/:id', (req, res) => {
  res.send('Show one record detail page')
})

// 新增一筆record
router.post('/', (req, res) => {
  res.send('Post one record')
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