//llamar al modelo de nuestra db
const Contacts = require('../schema/index.js')

//traer contactos de la base de datos
function getContacts (req,res){
    const allcontacts = Contacts.find(req.query).then(contacts=>{
        res.json(contacts)}).catch(err=>console.log(err))
}

function newContact (req,res){
    debugger
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
    const id=req.params.id;
    const upcontact = Contacts.findByIdAndUpdate(id,req.body, {new:true}).then(()=>res.json({message:"Updated contact"})) .catch(err => res.status(400).json({
        "error": err,
        "message": "Error updating"
    }))
}

module.exports={getContacts,newContact,deleteContact,updateContact}