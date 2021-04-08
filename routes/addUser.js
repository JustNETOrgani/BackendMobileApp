const express = require('express')
const users = require('../models/users')
const router = express.Router() // Route capabilities for express js.
const bcrypt = require('bcrypt')
const { response } = require('express')

router.get('/',(req, res) => {
    res.send('Welcome to posts via express.js')
})

router.post('/signUp', async (request, response) => {
    const saltedPass = await bcrypt.genSalt(10)
    const securePass = await bcrypt.hash(request.body.password, saltedPass)
    const newUser = new users({
        username: request.body.username,
        password: securePass
    })
    newUser.save().then(data => {
        response.json(data)
        console.log('User successfully created.')
    }).catch(err => {
        console.log('Error creating new user: ', err)
        response.json(err)
    })
})

router.get('/login', async (request, response) => {
    // Get users from DB.
    try {
         resultsArray =  await users.find()
    } catch (error) {
        console.log('Errror fetching data from DB!', error)
    }
    // Find the exact username.
    let foundStatus = resultsArray.findIndex(x => x.username === request.body.username)
    if (foundStatus === -1) {
        console.log('Sorry! Not a registered user.')
    }
    else {
        // User found hence continue with logic to get password.
        let hashedPassFromDB = resultsArray[foundStatus].password
        bcrypt.compare(request.body.password, hashedPassFromDB, function(err, result) {
            if (result == true) {
                // User correctly authenticated.
                console.log('User authenticated.')
                response.json(resultsArray[foundStatus])
            }
            else {
                console.log('User authentication failed.')
            }
            if (err) {
                console.log('Error processing login credentials.')
            }
        })
    }
})
module.exports = router
