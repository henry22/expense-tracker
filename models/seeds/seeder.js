const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const db = mongoose.connection
const records = require('./records.json')
const users = require('./users.json')
const bcrypt = require('bcryptjs')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

db.on('error', () => console.log('mongodb error'))
db.once('open', () => {
  console.log('mongodb connect')

  User.create(users)
    .then(() => {
      User.find({ email: 'user1@example.com'}, (err, user) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user[0].password, salt, (err, hash) => {
            if(err) throw err
            user[0].password = hash
            user[0].save()
          })
        })

        for (let i = 0; i < 5; i++) {
          records[i]['userId'] = user[0]._id
        }
      })
      .then(() => {
        User.find({ email: 'user2@example.com' }, (err, user) => {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user[0].password, salt, (err, hash) => {
              if (err) throw err
              user[0].password = hash
              user[0].save()
            })
          })

          for (let i = 5; i < 10; i++) {
            records[i]['userId'] = user[0]._id
          }
        })
        .then(() => {
          Record.create(records)
            .then(() => console.log('done, all the data are set'))
            .catch((err) => console.error(err))
        }).catch(err => console.error(err))
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
})