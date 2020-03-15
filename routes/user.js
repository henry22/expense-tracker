// routes/user.js
const express = require('express')
const router = express.Router()
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res) => {
  res.send('Login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('user already exists')

      return res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({
        name,
        email,
        password
      })

      newUser.save()
        .then(user => {
          return res.redirect('/')
        })
        .catch(err => {
          return console.error(err)
        })
    }
  })
})

// 登出
router.get('logout', (req, res) => {
  res.send('Logout')
})

module.exports = router