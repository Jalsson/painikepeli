import React, { Component } from 'react';
import button from '../images/button.png';
import buttonDown from '../images/button_down.png';

class ButtonGame extends Component{
    constructor(){
        super()
        this.state = {
            userName: "",
            points: 0,
            countToNext: 0,
            buttonStatus: "up"
        }
        this.pressButton = this.pressButton.bind(this)
    }


    componentDidMount() {
        console.log("didmount")
        fetch(window.location.href + "number/getPlayerInfo")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points,
                    userName: data.username
                })
            })
    }

    pressButton(params) {
        this.setState({buttonStatus: "down"})
        setTimeout(() => {
            this.setState({buttonStatus: "up"})
        fetch(window.location.href + "number/pressButton")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points,
                    countToNext: data.countToNext
                })
            })
        }, 500)
            
    }

    render() {
        return(
            <div>
                <h1>Hello {this.state.userName}</h1>
                <p>you have {this.state.points} points</p>
                <div className="button-container">
                {this.state.buttonStatus === "up" ? 
                <img onClick={this.pressButton} src={button} className="game-button" alt="Button" /> :
                <img src={buttonDown} className="game-button" alt="ButtonDown" />}
                <div className="centered-text"><h1>Press me!</h1></div>
                </div>
                {this.state.countToNext > 0 && <p>next score is {this.state.countToNext} clicks away</p>}
            </div>
        )
    }
}

export default ButtonGame;