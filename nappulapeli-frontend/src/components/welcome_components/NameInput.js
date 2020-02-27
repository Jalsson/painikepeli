import React, { Component } from 'react';
import Cookies from 'js-cookie';

class NameInput extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            warning: '',
            cookies: false
        }
        this.sendUserName = this.sendUserName.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    sendUserName() {
        //post username to server

        if (!this.state.cookies) {
            this.setState({
                warning: "You need to accept cookies before you can use the site :("
            })
            return;
        }
        fetch(window.location.href + "authentication/username", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName
            })
        })  // get response and give user correct message according what server responded
            .then(response => response.json())
            .then(data => {
                if (data.status === "failure") {
                    this.setState({warning: "That user name is already taken!"})
                }
                else if (data.status === "success") {
                   this.props.stateHandler("page","game")
                   this.props.stateHandler("userName",this.state.userName)
                }
                else if (data.status === "wrongCharacters") {
                    this.setState({warning: "You entered too long name(15 characters) or some of the character in your name were now allowed. Please enter only letters."})
                }
            })
    }

    // change name state when input is changed
    handleChange(event) {
        const { name, value, type, checked } = event.target;
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="fade-in" style={{marginTop: 50}}>
                {Cookies.get('userID') != null ? <h3>It seems that your cookie is either expired or wrong kind. You have to make new user to enter</h3>: <h2>New user? Please enter your name below</h2>}
                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="your name here "></input>
                <button className="nameInputButton" onClick={this.sendUserName}>Submit</button>
                <p>We use cookies to improve your experience and keep you logged in.</p>
                <p><b>I accept use of cookies</b>
                    <input 
                    type="checkbox"
                    name="cookies" 
                    checked={this.state.cookies} 
                    onChange={this.handleChange} 
                    />
                </p>
                <p>{this.state.warning}</p>
            </div>
        )
    }
}

export default NameInput;