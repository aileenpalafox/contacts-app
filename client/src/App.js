import React, {Component} from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {ContactList, Forms} from "./components";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    constructor() {
        super()
        this.state = {
            name:"",lastname:"",company:"",phone:"",email:"",message:"",contacts:[],skip:0,limit:10,
        }
        this.changeContact = this.changeContact.bind(this)
        this.getContacts = this.getContacts.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
    }


    changeContact(contact) {
        this.setState(contact)
    }

    componentDidMount() {
        this.getContacts()
    }

    getContacts(){
        fetch(`http://localhost:4000/contacts?limit=10&skip=${this.state.skip}`)
            .then((response) => response.json())
            .then((contacts) => this.setState({ contacts }))
    }

    nextPage(event){
        /*this.skip=this.skip+10
        this.getContacts()
        if (this.state.skip < this.getContacts.length){
            this.setState({
                skip: this.state.skip + this.state.limit,
            })
            //this.getContacts()
            console.log("next skip ",this.state.skip)
        }*/
        this.getContacts()
        this.setState({
            skip: this.state.skip + this.state.limit
        })

        console.log("next ",this.state.skip)

    }
    prevPage(event){
        //this.getContacts()
        if(this.state.skip > -10) {
            this.setState({
                skip: this.state.skip - this.state.limit,
            })
            this.getContacts()
            console.log("prev skip ",this.state.skip)
        }
        /*this.setState({
            skip: this.state.skip - this.state.limit,
        })
        this.getContacts()
        console.log("prev ",this.state.skip)*/
    }


    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar bg-light">
                        <Link to="/" className="navbar-brand">Contacts app</Link>
                    </nav>
                    <div>
                        <button className="btn btn-secondary m-3" onClick={this.prevPage}> Previous Page </button>
                        <button className="btn btn-secondary m-3" onClick={this.nextPage}> Next Page </button>
                    </div>
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
