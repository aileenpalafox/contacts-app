import React, {Component} from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {ContactList, Forms} from "./components";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    constructor() {
        super()
        this.state = {
            name:"",lastname:"",company:"",phone:"",email:"",message:"",contacts:[]
        }
        this.changeContact = this.changeContact.bind(this)
        this.getContacts = this.getContacts.bind(this)
    }


    changeContact(contact) {
        this.setState(contact)
    }
    getContacts(){
        fetch('https://contacts-app-aileen.herokuapp.com/contacts')
            .then((response) => response.json())
            .then((contacts) => this.setState({ contacts }))
    }
    componentDidMount() {
        this.getContacts()
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand">Contacts app</Link>
                    </nav>
                        <div className="row">
                            <div className="col-8">
                                <ContactList updateContact={this.changeContact} contacts={this.state.contacts} getContacts={this.getContacts}/>
                            </div>
                            <div className="col-4">
                                <Forms contact={this.state} updateContact={this.changeContact} getContacts={this.getContacts} />
                            </div>
                        </div>
                </div>
            </Router>
        );
    }
}

export default App;
