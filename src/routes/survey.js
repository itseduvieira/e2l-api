'use strict'

const express = require('express')
const router = express.Router()
const debug = require('debug')
const mongoose = require('mongoose')

router.post('/', async (req, res) => {
    try {
        const surveySchema = new mongoose.Schema({}, { strict: false })
        const Survey = mongoose.model('Survey', surveySchema)
        const survey = new Survey(req.body)

        await survey.save()
    } catch (error) {
        res.status(500).statusMessage(error)
    }
})

module.exports = router