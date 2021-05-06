/*
const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(3000)*/

module.exports=(router)=>{
    //read json with info
    router.get("/contacts",function (req,res){
        const contacts = require("./stubs/contacts.json")
        res.json(contacts)
    })
}
