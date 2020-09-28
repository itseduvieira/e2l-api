'use strict'

const express = require('express')
const router = express.Router()
const debug = require('debug')('e2l:api')
const mongoose = require('mongoose')
const Survey = require('../model/survey')

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const survey = new Survey(data)

        await survey.save()

        res.json(survey)
    } catch (error) {
        debug(error)

        res.status(500).json(error)
    }
})

module.exports = router