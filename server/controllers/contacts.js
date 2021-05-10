//llamar al modelo de nuestra db
const Contacts = require('../schema/index.js')

//validations
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateLetters = function(name) {
    var re = /^[a-z]+$/i;
    return re.test(name)
};

const validateAlphanumeric = function(value){
    if (!value){return true}
    var regex = /^[a-z1-9]+$/i;
    return  regex.test(value)
};

const validateNumbers = function (value){
    if (!value){return true}
    var regex = /^[\d]{10}$/;
    return regex.test(value)
}

//traer contactos de la base de datos
function getContacts (req,res){
        const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
        const skip = parseInt(req.query.skip);// Make sure to parse the skip to number
        const contacts = Contacts.find({}).skip(skip).limit(limit).then(contacts=>{
            res.json(contacts)}).catch(err=>console.log(err))
}

function newContact (req,res){
    console.log(req.body)
    const {name,lastname, company,phone,email}=req.body;
    const newcontact = new Contacts({
        name:name,lastname:lastname, company:company,phone:phone,email:email
    })
    newcontact.save().then(()=>res.json({message:"Created contact"})) .catch(err => res.status(400).json({
        "error": err,
        "message": "Error creating"
    }))
}

function deleteContact (req,res){
    const id=req.params.id;
    const delcontact = Contacts.findById(id)
    delcontact.remove().then(()=>res.json({message:"Deleted contact"})) .catch(err => res.status(400).json({
        "error": err,
        "message": "Error deleting"
    }))
}

function updateContact(req,res){
    if (validateLetters(req.body.name)&&validateLetters(req.body.lastname)&&validateAlphanumeric(req.body.company)&&validateNumbers(req.body.phone)&&validateEmail(req.body.email)){
        const id=req.params.id;
        const upcontact = Contacts.findByIdAndUpdate(id,req.body, {new:true}).then(()=>res.json({message:"Updated contact"})) .catch(err => res.status(400).json({
            "error": err,
            "message": "Error updating"
        }))
    } else{
        res.status(400).json({
            "error": new Error(),
            "message": "Some of the data doesn't pass the validations"
        })
    }
}

module.exports={getContacts,newContact,deleteContact,updateContact}