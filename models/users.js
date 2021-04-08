const mongoose = require('mongoose') // To help connect to the mongoDB

// Creating a schema for data to be stored in the DB.
const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', usersSchema) // 'Users' would be the name of the table in the DB.