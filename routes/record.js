const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const moment = require('moment')
const {authenticated} = require('../config/auth')

// 列出所有records
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

// 新增一筆record頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 顯示一筆record詳細頁面
router.get('/:id', authenticated, (req, res) => {
  res.send('Show one record detail page')
})

// 新增一筆record
router.post('/', authenticated, (req, res) => {
  const { name, merchant, category, date, amount } = req.body

  const newRecord = new Record({
    name: name,
    merchant: merchant,
    category: category,
    date: date,
    amount: amount,
    UserId: req.user.id
  })

  newRecord.save()
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// 修改一筆record頁面
router.get('/:id/edit', authenticated, (req, res) => {
  const recordId = req.params.id

  User.findByPk(req.user.id)
    .then(user => {
      if(!user) throw new Error('user not found')

      return Record.findOne({
        where: {
          UserId: req.user.id,
          id: recordId
        }
      })
    })
    .then(record => {
      let recordDate = new Date(record.date)
      return res.render('edit', { record: record.get(), recordDate: moment(recordDate).format('YYYY/MM/DD')})
    })
    .catch(err => res.status(422).json(err))
})

// 修改一筆record
router.put('/:id', authenticated, (req, res) => {
  const { name, merchant, category, date, amount } = req.body
  const recordId = req.params.id

  User.findByPk(req.user.id)
    .then(user => {
      if(!user) throw new Error('user not found')

      return Record.findOne({
        where: {
          UserId: req.user.id,
          id: recordId
        }
      })
    })
    .then(record => {
      record.name = name
      record.nerchant = merchant
      record.category = category
      record.date = date
      record.amount = amount

      return record.save()
    })
    .then(record => res.redirect('/'))
    .catch(err => res.status(422).json(err))
})

// 刪除一筆record
router.delete('/:id', authenticated, (req, res) => {
  const recordId = req.params.id

  User.findByPk(req.user.id)
    .then(user => {
      if(!user) throw new Error('user not found')

      return Record.destroy({
        where: {
          UserId: req.user.id,
          id: recordId
        }
      })
    })
    .then(record => res.redirect('/'))
    .catch(err => res.status(422).json(err))
})

module.exports = router