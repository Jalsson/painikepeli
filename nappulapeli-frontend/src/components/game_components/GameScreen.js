import React, { Component } from 'react';
import Game from './Game'
import Leaderboards from'./Leaderboards'
import GameInfo from '../welcome_components/GameInfo' 

class GameScreen extends Component{
    constructor(){
        super()
        this.state = {
            renderedPage: 'game'
        }
        this.setPage = this.setPage.bind(this)
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

    //setting page state, this state changed what page is rendered under this component
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
                <div className="row" >
                    <div
                    className={this.state.renderedPage === "game" ? selectedButton: unSelectedButton} 
                    onClick={() => this.setPage("game")}>
                        <h2>Play</h2>
                    </div>
                    <div
                    className={this.state.renderedPage === "leaderboard" ? selectedButton: unSelectedButton} 
                    onClick={() => this.setPage("leaderboard")}> <h2>Leaderboards</h2> </div>
                     <div
                    className={this.state.renderedPage === "howTo" ? selectedButton: unSelectedButton} 
                    onClick={() => this.setPage("howTo")}> <h2>How to play</h2> </div>
                </div>
                {/* Alter the rendered page acording to what is set to rendered page */}
                {this.state.renderedPage === "game" && <Game/>}{this.state.renderedPage === "leaderboard" && <Leaderboards/>} {this.state.renderedPage === "howTo" && <div className="game-screen-div"><GameInfo/></div>}
            </div>
        )
    }
}

export default GameScreen;