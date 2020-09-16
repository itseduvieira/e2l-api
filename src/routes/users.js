'use strict'

const express = require('express')
const router = express.Router()
const debug = require('debug')
const admin = require('firebase-admin')

router.post('/', async (req, res) => {
  try {
    const created = await admin.auth().createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      displayName: req.body.displayName,
      disabled: false,
      phoneNumber: req.body.phoneNumber,
      photoURL: req.body.photoURL
    })

    const claim = {}
    claim[req.body.role] = true

    await admin.auth().setCustomUserClaims(created.uid, claim)

    debug(created)

    res.json(created)
  } catch (error) {
    debug(error)

    res.status(500).json(error)
  }
})

module.exports = router