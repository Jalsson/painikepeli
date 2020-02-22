import React, { Component } from 'react';

class UserNameInput extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
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
                    prompt("failure");
                }
                else if (data.status === "success") {
                    window.location.reload();
                }
                else if (data.status === "wrongCharacters") {
                    prompt("wrongCharacters");
                }
            })
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <h1>you have to insert your userName</h1>
                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="your name here "></input>
                <button onClick={this.sendUserName}>submit</button>
            </div>
        )
    }
}

export default UserNameInput;