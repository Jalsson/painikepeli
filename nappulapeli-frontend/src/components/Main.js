import React, { Component } from 'react';
import UserNameInput from './UserNameInput';

class Main extends Component{
    constructor () {
        super()
        this.state = {
            userName: "",
            points: 0,
            countToNext: 0
        }
        this.fetchPressButton = this.fetchPressButton.bind(this)
    }


    componentDidMount() {
        fetch(window.location.href+"authentication")
        .then(response => response.json())
        .then(data => {
            this.setState({
                number: data.points,
                userName: data.username
            })
        })
    }

     fetchPressButton(params) {
        fetch(window.location.href+"number/pressButton")
        .then(response => response.json())
        .then(data => {
            this.setState({
                number: data.points,
                countToNext: data.countToNext
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.userName != null ? <h1>hello {this.state.userName}</h1> : 
                <UserNameInput/>
                }

                {this.state.number}
                <button onClick={this.fetchPressButton}>press it</button>
                
                {this.state.countToNext}
            </div>
        )
    }
}

export default Main;