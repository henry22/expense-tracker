const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const db = mongoose.connection
const records = require('./records.json')
const users = require('./users.json')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

db.on('error', () => console.log('mongodb error'))
db.once('open', () => {
  console.log('mongodb connect')

  User.create(users, (err, users) => {
    users.forEach(user => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err
          user.password = hash

          user.save()
        })
      })
    })
  })

  console.log('done')
})