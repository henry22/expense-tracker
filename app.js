const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: 'ac expense-tracker',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

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

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
app.use('/users', require('./routes/user'))

app.listen(port, () => console.log('Server is running'))