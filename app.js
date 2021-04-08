const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose') // To help connect to the mongoDB
require('dotenv/config') // Import app secrets.
// Import routes
const routes =  require('./routes/addUser')

// Create Middleware to handle pre-logic.
//app.use('/posts', signUpRoute) // All posts would use this route.
app.use(express.json()) // JSON parser.
app.use(cors()) // To handle Cross-origin issues.
// Middleware for base app
app.use('/app', routes)

// Routes
app.get('/',(request, response) => {
    res.send('Welcome to express.js')
})
// Connect to the DB.
mongoose.connect(process.env.DBConn, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'))

// Listening via port.
availablePort = process.env.PORT
if (availablePort) {
    app.listen(availablePort)
    console.log('Server runing on port:', availablePort)
}
else {
    const preferedPort = 8000
    app.listen(preferedPort)
    console.log('Server runing on port:', preferedPort)
}