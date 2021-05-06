const mongoose = require('mongoose')
const { Schema } = mongoose;

const contactsSchema = new Schema({
    name:  String,
    lastname: String,
    company:   String,
    phone: Number,
    email: String,
});

console.log("ffff")
module.exports = mongoose.model("Contact",contactsSchema)