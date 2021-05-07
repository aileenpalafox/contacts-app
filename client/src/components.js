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
        // contact._id <- vamos a identificar al contacto
        return (
            <div>
                <button>Edit</button>
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
                {this.state.contacts.map((contact) => <Contact contact={contact}/>)}
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
    }
    //update data in the UI
    changeName(event){
        const name = event.target.value
        this.setState({name})
    }
    changeLastname(event){
        const lastname = event.target.value
        this.setState({lastname})
    }
    changeCompany(event){
        const company = event.target.value
        this.setState({company})
    }
    changePhone(event){
        const phone = event.target.value
        this.setState({phone})
    }
    changeEmail(event){
        const email = event.target.value
        this.setState({email})
    }
    //post contact info to database
    submitForm(event){
        event.preventDefault()
        fetch('http://localhost:4000',{method:"post",headers:{
            "Content-Type":"application/json"
            },body:JSON.stringify(this.state)})
            .then((response) => response.json())
            .then(({message}) => this.setState({ message }))
    }
    render(){
        const form = this.props.form
        return(
            <form onSubmit={this.submitForm}>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={this.state.name} required onChange={this.changeName}/>
                </div>
                <div>
                    <label>Lastname: </label>
                    <input type="text" name="lastname" value={this.state.lastname} required onChange={this.changeLastname}/>
                </div>
                <div>
                    <label>Company: </label>
                    <input type="text" name="company" value={this.state.company} onChange={this.changeCompany}/>
                </div>
                <div>
                    <label>Phone: </label>
                    <input type="text" name="phone" value={this.state.phone} onChange={this.changePhone}/>
                </div>
                <div className>
                    <label>Email: </label>
                    <input type="email" name="email" value={this.state.email} required onChange={this.changeEmail}/>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
                {
                    this.state.message?<div>{this.state.message}</div>:null
                }
            </form>
        )
    }
}