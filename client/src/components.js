import React from 'react';

class DeleteButton extends React.Component{
    constructor() {
        super();
        this.deleteContact=this.deleteContact.bind(this)
    }
    deleteContact(event){
        fetch('https://contacts-app-aileen.herokuapp.com/'+this.props.id,{method:"delete"})
            .then((response) => response.json())
            .then(({message}) => this.setState({ message }))
    }
    render() {
        return (
            <button onClick={this.deleteContact}>Delete</button>
        );
    }
}

class Contact extends React.Component {
    render () {
        const contact = this.props.contact
        const updateContact = this.props.updateContact
        // contact._id <- vamos a identificar al contacto
        return (
            <div>
                <button onClick={() => {
                    updateContact(contact)
                }}>Edit</button>
                <ul>
                    <li>{contact.name}</li>
                    <li>{contact.lastname}</li>
                    <li>{contact.company}</li>
                    <li>{contact.phone}</li>
                    <li>{contact.email}</li>
                </ul>
                <DeleteButton id={contact._id}/>
            </div>
        )
    }
}

export class ContactList extends React.Component {
    constructor() {
        super()
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        fetch('https://contacts-app-aileen.herokuapp.com/contacts')
            .then((response) => response.json())
            .then((contacts) => this.setState({ contacts }))
    }

    render() {
        return (
            <div>
                {this.state.contacts.map((contact,index) => <Contact contact={contact} key={index} updateContact={this.props.updateContact} />)}
            </div>
        )
    }
}

export class Forms extends React.Component{
    constructor() {
        super()
        this.state = {
            name:"",lastname:"",company:"",phone:"",email:"",message:""
        }
        this.changeName = this.changeName.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
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
            _id: ""
        })
    }
    //post contact info to database
    submitForm(event){
        event.preventDefault()
        if (this.props.contact._id) {
            fetch('https://contacts-app-aileen.herokuapp.com/' + this.props.contact._id ,{method:"put",headers:{
                    "Content-Type":"application/json"
                },body:JSON.stringify(this.props.contact)})
                .then((response) => response.json())
                .then(({message}) => this.setState({ message }))
        } else {
            fetch('https://contacts-app-aileen.herokuapp.com/',{method:"post",headers:{
                    "Content-Type":"application/json"
                },body:JSON.stringify(this.props.contact)})
                .then((response) => response.json())
                .then(({message}) => this.setState({ message }))
        }
        this.resetForm()
    }
    render(){
        const form = this.props.form
        return(
            <form onSubmit={this.submitForm}>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={this.props.contact.name} required onChange={this.changeName}/>
                </div>
                <div>
                    <label>Lastname: </label>
                    <input type="text" name="lastname" value={this.props.contact.lastname} required onChange={this.changeLastname}/>
                </div>
                <div>
                    <label>Company: </label>
                    <input type="text" name="company" value={this.props.contact.company} onChange={this.changeCompany}/>
                </div>
                <div>
                    <label>Phone: </label>
                    <input type="text" name="phone" value={this.props.contact.phone} onChange={this.changePhone}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" name="email" value={this.props.contact.email} required onChange={this.changeEmail}/>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                    {
                        this.props.contact._id ? <button onClick={this.resetForm}>Reset</button> : null
                    }
                </div>
                {
                    this.state.message?<div>{this.state.message}</div>:null
                }

            </form>
        )
    }
}