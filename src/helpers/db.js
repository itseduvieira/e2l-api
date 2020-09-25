'use strict'
const config = require('../../config/constants')
const mongoose = require('mongoose')
const debug = require('debug')

;(async() => {
    try {
        await mongoose.connect(config.mongo.connectionString, { useNewUrlParser: true , useUnifiedTopology: true })

        debug('MongoDB connected')
    } catch(err) {
        debug(err)
    }
})()

