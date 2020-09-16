'use strict'

const config = require('../config/constants')
const debug = require('debug')('vis:server')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

const admin = require('firebase-admin')
const serviceAccount = require('../config/serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.database
})

module.exports = app