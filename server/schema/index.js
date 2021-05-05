import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactsSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    lastname: String,
    company:   String,
    phone: Number,
    email: String,
});

module.exports = {contactsSchema}