const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connect'))

app.get('/', (req, res) => {
  res.send('expense tracker')
})

app.listen(port, () => console.log('Server is running'))