const mongoose = require('mongoose')
const Record = require('../record')
const db = mongoose.connection
const records = require('./records.json')

mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

db.on('error', () => console.log('mongodb error'))
db.once('open', () => {
  console.log('mongodb connect')

  for (let i = 0; i < records.length; i++) {
    Record.create({
      name: records[i].name,
      category: records[i].category,
      date: records[i].date,
      amount: records[i].amount
    })
  }

  console.log('done')
})