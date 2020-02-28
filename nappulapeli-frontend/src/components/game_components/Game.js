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

    // when we start the game we get our points from server
    componentDidMount() {
        fetch(window.location.href + "authentication")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points,
                    userName: data.username
                })
            })
    }

    // Hadles all the pressing
    pressButton(params) {
        //random words that button says everytime user presses it
        let buttonTexts = ["Daring today?","Im ready, you?","Leeroyyy!","Really pressing stuff","How's weather?","React is fun","Almoust there","Faster!!", "Getting closer", "Keep going!","Harder!","Stronger!"]
        
        //shanges button status "down" so react can render different image
        this.setState({buttonStatus: "down", buttonPressingText: buttonTexts[Math.floor(Math.random() * buttonTexts.length)]})
        //adding small delay after we bring the button button back up
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
        }, 300)
            
    }


    resetPoints(params) {
        // when user score is 0 we call this and server resets our score and gives 
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
                {/* here we check for if the points are below 0 and if so we give gameover screen for user */}
                {this.state.points <= 0 && this.state.points != null && <GameOver resetPoints={this.resetPoints}/>}

                {/* Button conainer and button itself */}
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