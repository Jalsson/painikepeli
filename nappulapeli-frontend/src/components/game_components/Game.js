import React, { Component } from 'react';
import GameOver from './GameOver'
import button from '../../images/button.png';
import buttonDown from '../../images/button_down.png';


class Game extends Component{
    constructor(){
        super()
        this.state = {
            userName: "",
            points: null,
            countToNext: 0,
            buttonStatus: "up",
            buttonText: "Press me!",
            buttonPressingText: "Keep going!",
            renderedPage: "game"
        }
        this.pressButton = this.pressButton.bind(this)
        this.resetPoints = this.resetPoints.bind(this)
    }


    componentDidMount() {
        fetch(window.location.href + "game/getPlayerInfo")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points,
                    userName: data.username
                })
            })
    }

    pressButton(params) {
        let buttonTexts = ["Daring today?","Im ready, you?","Leeroyyy!","Really pressing stuff","How's weather?","React is fun","Almoust there","Faster!!", "Getting closer", "Keep going!","Harder!","Stronger!"]
        
        this.setState({buttonStatus: "down", buttonPressingText: buttonTexts[Math.floor(Math.random() * buttonTexts.length)]})
        setTimeout(() => {
            this.setState({buttonStatus: "up",buttonText: buttonTexts[Math.floor(Math.random() * buttonTexts.length)]})
        fetch(window.location.href + "game/pressButton")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points,
                    countToNext: data.countToNext
                })
            })
        }, 250)
            
    }

    resetPoints(params) {
        fetch(window.location.href + "game/resetPoints")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points
                })
            })
            
    }

    render() {
        return(
            <div className="fade-in">
                <h2 className="bigger-text" style={{color: "White",marginTop: 40}}>Your points: <b>{this.state.points}</b></h2>
                {this.state.points <= 0 && this.state.points != null && <GameOver resetPoints={this.resetPoints}/>}
                <div className="button-container">
                    {this.state.buttonStatus === "up" ? 
                    <div> 
                        <img onClick={this.pressButton} src={button} className="game-button" alt="Button" /> 
                        <div className="centered-text">{this.state.countToNext > 0 ? 
                        <p>Next price awarded in {this.state.countToNext} clicks</p>: 
                        <p >ready?</p>}
                        <h1>{this.state.buttonText}</h1></div> 
                    </div>:
                    <div>
                        <img src={buttonDown} className="game-button" alt="ButtonDown" />
                        <div className="centered-text text-down">
                        <p>Next price awarded in {this.state.countToNext} clicks</p>
                            <h1>{this.state.buttonText}</h1>
                        </div>
                    </div>}
                </div>
                
            </div>
        )
    }
}

export default Game;