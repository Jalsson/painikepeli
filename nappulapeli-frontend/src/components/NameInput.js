import React, { Component } from 'react';
import Cookies from 'js-cookie';

class NameInput extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            warning: ''
        }
        this.sendUserName = this.sendUserName.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    sendUserName() {
        fetch(window.location.href + "authentication/username", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.userName
            })
        })
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
                    this.setState({warning: "Some of the character in your name were now allowed. Please enter only letters."})
                }
            })
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                {Cookies.get('userID') != null ? <h3>It seems that your cookie is either expired or wrong kind. You have to make new user to enter</h3>: <h2>New user? Please enter your name below</h2>}
                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="your name here "></input>
                <button className="nameInputButton" onClick={this.sendUserName}>Submit</button>
                <p>{this.state.warning}</p>
            </div>
        )
    }
}

export default NameInput;