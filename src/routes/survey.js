'use strict'

const express = require('express')
const router = express.Router()
const debug = require('debug')
const mongoose = require('mongoose')
const { Schema } = mongoose;

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const surveySchema = new Schema({}, { strict: false })
        const Survey = mongoose.model('Survey', surveySchema)
        const survey = new Survey(data)

        await survey.save()

        res.json(survey)
    } catch (error) {
        debug(error)
        res.status(500).json(error)
    }
})

module.exports = router