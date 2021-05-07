import React, {Component} from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {ContactList, Forms} from "./components";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    constructor() {
        super()
        this.state = {
            name:"",lastname:"",company:"",phone:"",email:"",message:""
        }
        this.changeContact = this.changeContact.bind(this)
    }


    changeContact(contact) {
        this.setState(contact)
    }
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand">Mern Easy Boilerplate-Testing refresh</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Link-1</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Link2</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <ContactList updateContact={this.changeContact}/>
                    <Forms contact={this.state} updateContact={this.changeContact}/>
                </div>
            </Router>
        );
    }
}

export default App;
