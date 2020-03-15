const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

handlebars.registerHelper('isEqual', (arg1, arg2, options) => {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this)
})

mongoose.connect('mongodb://localhost/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connect'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

app.listen(port, () => console.log('Server is running'))