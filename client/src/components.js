import React from 'react';

class Contact extends React.Component {
    render () {
        const contact = this.props.contact
        // contact._id <- vamos a identificar al contacto
        return (
            <div>
                <button>Editar</button>
                <ul>
                    <li>{contact.name}</li>
                    <li>{contact.lastname}</li>
                    <li>{contact.company}</li>
                    <li>{contact.phone}</li>
                    <li>{contact.email}</li>
                </ul>
                <button>Borrar</button>
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
            name:"",lastname:"",company:"",phone:"",email:""
        }
        this.changeName = this.changeName.bind(this);
        this.changeLastname = this.changeLastname.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
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
    submitForm(){}
    render(){
        const form = this.props.form
        return(
            <form>
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
            </form>

        )
    }
}