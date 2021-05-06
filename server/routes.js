const {getContacts,newContact,deleteContact,updateContact} = require("./controllers/contacts.js")

module.exports=(router)=>{
    //read contacts from mongodb
    router.get("/contacts",function (req,res){
       getContacts(res)
    })
    //write contacts
    router.post("/",function(req,res){
        newContact(req,res)
    })
    //delete contacts
    router.delete("/:id",function (req,res){
        //res.send(req.params.id)
        deleteContact(req,res)
    })
    router.put("/:id",function (req,res){
        //res.send(req.params.id)
        updateContact(req,res)
    })
}
