'use strict'

const admin = require('firebase-admin')
admin.initializeApp({
  credential: admin.credential.cert(require('../config/serviceAccountKey.json')),
  databaseURL: require('../config/constants').firebase.database
})

const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(require('cors')({ origin: '*' }))

app.use('/user', require('./routes/users'))
app.use('/survey', require('./routes/survey'))

require('./helpers/db')

module.exports = app