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

router.get('/verificationEmail', async (req, res) => {
  try {
    admin.auth().languageCode = 'pt_BR';

    let user = admin.auth().getUserByEmail(req.body)

      await user.sendEmailVerification()
        .then(function() {
          res.json("Email enviado com sucesso.")
        }).catch(function(error) {
          debug(error)
      });

  } catch {
    debug(error)

    res.status(500).json(error)
  }
})

router.get('/recover', async (req, res) => {
  try {
    let emailAddress = req.body.email

    await admin.auth().sendPasswordResetEmail(emailAddress).then(function() {
       res.json("Foi enviado um link para redefinição de senha em seu email.")
    }).catch(function(error) {
       debug(error)

       res.status(500).json(error)
    });
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