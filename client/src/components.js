import React from 'react';

class DeleteButton extends React.Component{
    constructor() {
        super();
        this.deleteContact=this.deleteContact.bind(this)
    }
    deleteContact(event){
        fetch('https://contacts-app-aileen.herokuapp.com/'+this.props.id,{method:"delete"})
            .then((response) => response.json())
            .then(({message}) => {
                this.setState({ message })
                this.props.getContacts()
            })
    }
    render() {
        return (
            <button className="btn btn-danger" onClick={this.deleteContact}>Delete</button>
        );
    }
}

class Contact extends React.Component {
    render () {
        const contact = this.props.contact
        const updateContact = this.props.updateContact
        const getContacts=this.props.getContacts
        // contact._id <- vamos a identificar al contacto
        return (
            <div className="card w-50 p-3" >
                <ul>
                    <li>{contact.name}</li>
                    <li>{contact.lastname}</li>
                    <li>{contact.company}</li>
                    <li>{contact.phone}</li>
                    <li>{contact.email}</li>
                </ul>
                <div className="btn-group">
                    <button className="btn btn-success" onClick={() => {
                        updateContact(contact)
                    }}>Edit</button>
                    <DeleteButton getContacts={this.props.getContacts} id={contact._id}/>
                </div>

            </div>
        )
    }
}

export class ContactList extends React.Component {
    render() {
        return (
            <div className="d-flex flex-wrap justify-content-between">
                {this.props.contacts.map((contact,index) => <Contact contact={contact} key={index} updateContact={this.props.updateContact} getContacts={this.props.getContacts} />)}
            </div>
        )
    }
}

export class Forms extends React.Component{
    constructor() {
        super()
        this.state = {
            message:""
        }
        this.changeName = this.changeName.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.closeMessage = this.closeMessage.bind(this);
    }
    //update data in the UI
    changeName(event){
        const name = event.target.value
        this.props.updateContact({name})
    }
    changeLastname(event){
        const lastname = event.target.value
        this.props.updateContact({lastname})
    }
    changeCompany(event){
        const company = event.target.value
        this.props.updateContact({company})
    }
    changePhone(event){
        const phone = event.target.value
        this.props.updateContact({phone})
    }
    changeEmail(event){
        const email = event.target.value
        this.props.updateContact({email})
    }
    resetForm() {
        this.props.updateContact({
            name: "",
            lastname: "",
            company: "",
            phone: "",
            email: "",
            _id: "",
        })
    }
    closeMessage() {
        this.setState({message: ""})
    }

    //post contact info to database
    submitForm(event){
        event.preventDefault()
        if (this.props.contact._id) {
            fetch('https://contacts-app-aileen.herokuapp.com/' + this.props.contact._id ,{method:"put",headers:{
                    "Content-Type":"application/json"
                },body:JSON.stringify(this.props.contact)})
                .then((response) => response.json())
                .then(({message}) => {
                    this.setState({ message })
                    this.props.getContacts()
                    this.resetForm()
                })
        } else {
            fetch('https://contacts-app-aileen.herokuapp.com/',{method:"post",headers:{
                    "Content-Type":"application/json"
                },body:JSON.stringify(this.props.contact)})
                .then((response) => response.json())
                .then(({message}) => {
                    this.setState({ message })
                    this.props.getContacts()
                    this.resetForm()
                })
        }
    }
    render(){
        const form = this.props.form
        return(
            <form onSubmit={this.submitForm}>
                <div>
                    <label className = "form-label">Name: </label>
                    <input className="form-control" type="text" name="name" value={this.props.contact.name} required onChange={this.changeName}/>
                </div>
                <div>
                    <label className = "form-label">Lastname: </label>
                    <input className="form-control" type="text" name="lastname" value={this.props.contact.lastname} required onChange={this.changeLastname}/>
                </div>
                <div>
                    <label className = "form-label">Company: </label>
                    <input className="form-control" type="text" name="company" value={this.props.contact.company} onChange={this.changeCompany}/>
                </div>
                <div>
                    <label className = "form-label">Phone: </label>
                    <input className="form-control" type="text" name="phone" value={this.props.contact.phone} onChange={this.changePhone}/>
                </div>
                <div>
                    <label className = "form-label">Email: </label>
                    <input className="form-control" type="email" name="email" value={this.props.contact.email} required onChange={this.changeEmail}/>
                </div>
                <div className="btn-group">
                    <input className="btn btn-primary" type="submit" value="Submit"/>
                    {
                        this.props.contact._id ? <button className="btn btn-warning" onClick={this.resetForm}>Reset</button> : null
                    }
                </div>
                {
                    this.state.message?<div>{this.state.message} <span onClick={this.closeMessage}>x</span></div>:null
                }

            </form>
        )
    }
}