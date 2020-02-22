import React, { Component } from 'react';
import UserNameInput from './UserNameInput';
import ButtonGame from './ButtonGame';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            userName: ""
        }
    }

    componentDidMount() {
        fetch(window.location.href + "authentication")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    userName: data.username
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.userName != null ? <ButtonGame/> :
                    <UserNameInput />
                }
            </div>
        )
    }
}

export default Main;