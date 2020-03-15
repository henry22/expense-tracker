// routes/user.js
const express = require('express')
const router = express.Router()

// 登入頁面
router.get('/login', (req, res) => {
  res.send('Login')
})

// 登入檢查
router.post('/login', (req, res) => {
  res.send('Login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.send('Register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  res.send('Register')
})

// 登出
router.get('logout', (req, res) => {
  res.send('Logout')
})

module.exports = router