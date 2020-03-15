const express = require('express')
const router = express.Router()

// Index 頁面/首頁
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router