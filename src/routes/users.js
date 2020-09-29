'use strict'

const express = require('express')
const router = express.Router()
const debug = require('debug')('e2l:api')
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
    claim[req.body.customClaims] = true

    await admin.auth().setCustomUserClaims(created.uid, claim)

    debug(created)

    res.json(created)
    
  } catch (error) {
    debug(error)

    res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  let nextPageToken
  let users = []

  try {
    do {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken)

      users.push(...listUsersResult.users)

      nextPageToken = listUsersResult.pageToken
    } while(nextPageToken)

    res.json(users)
  } catch (error) {
    throw error
  }
})

router.get('/:uid', async (req, res) => {
  try {
    let user = await admin.auth().getUser(req.params.uid)

    res.json(user)
  } catch (error) {
    throw error
  }
})

router.delete('/:uid', async (req, res) => {
  try {

    await admin.auth().deleteUser(req.params.uid)

    res.json({
      success: true
    })

  } catch (error) {
    debug(error)

    res.status(500).json(error)
  }
})

module.exports = router