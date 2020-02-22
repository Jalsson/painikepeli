import React, { Component } from 'react';

class ButtonGame extends Component{
    constructor(){
        super()
        this.state = {
            userName: "",
            points: 0,
            countToNext: 0
        }
        this.PressButton = this.PressButton.bind(this)
    }


    componentDidMount() {
        console.log("didmount")
        fetch(window.location.href + "number/getPlayerInfo")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    points: data.points,
                    userName: data.username
                })
            })
    }

    PressButton(params) {
        fetch(window.location.href + "number/pressButton")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points,
                    countToNext: data.countToNext
                })
            })
    }

    render() {
        return(
            <div>
                <h1>Hello {this.state.userName}</h1>
                <p>you have {this.state.points} points</p>
                <button onClick={this.PressButton}>press it</button>
                {this.state.countToNext > 0 && <p>next score is {this.state.countToNext} clicks away</p>}
            </div>
        )
    }
}

export default ButtonGame;