import React, { Component } from 'react';
import button from '../images/button.png';
import buttonDown from '../images/button_down.png';
import Game from './Game'

class GameScreen extends Component{
    constructor(){
        super()
        this.state = {
            renderedPage: 'game'
        }
        this.setPage = this.setPage.bind(this)
    }


    componentDidMount() {
        fetch(window.location.href + "number/getPlayerInfo")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    points: data.points,
                    userName: data.username
                })
            })
    }

    setPage(page) {
        this.setState({
            renderedPage: page
        })
    }

    render() {
        let selectedButton ='col sub-menu-button selected-clor'
        let unSelectedButton = 'col sub-menu-button unselected-clor'
        return(
            <div >
                <div className="row">
                    <div
                    className={this.state.renderedPage === "game" ? selectedButton: unSelectedButton} 
                    onClick={() => console.log("registaration was pressed")}>
                        <h2>Play</h2>
                    </div>
                    <div
                    className={this.state.renderedPage === "leaderboard" ? selectedButton: unSelectedButton} 
                    onClick={() => console.log("info was pressed")}> <h2>Leaderboards</h2> </div>
                     <div
                    className={this.state.renderedPage === "howTo" ? selectedButton: unSelectedButton} 
                    onClick={() => console.log("info was pressed")}> <h2>How to play</h2> </div>
                </div>
                {this.state.renderedPage === "game" && <Game/>}{this.state.renderedPage === "leaderboard" && <h1>leaderboards</h1>} {this.state.renderedPage === "howTo" && <h1>How to play</h1>}
            </div>
        )
    }
}

export default GameScreen;