const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String
})

model.expotrs = mongoose.model('User', UserSchema)