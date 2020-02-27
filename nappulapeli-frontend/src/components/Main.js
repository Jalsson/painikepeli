import React, { Component } from 'react';
import WelcomeScreen from './welcome_components/WelcomeScreen';
import GameScreen from './game_components/GameScreen';
import Cookies from 'js-cookie';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            page: "welcomeScreen"
        }
        this.stateHandler = this.stateHandler.bind(this)
    }

    stateHandler(stateName, value) {
        this.setState({
            [stateName]: value
        })
    }

    // here we fetch the username and render gamescreen if username is setted
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

        // if no welcome cookie is setted we dont want to show welcome screen at all to user and take client straight to the game screen
        if( (this.state.page === "game" || Cookies.get('noWelcome') === "false") && this.state.userName !== null){
            return <GameScreen />
        }
        else if (this.state.userName !== null && this.state.page === "game") {
            return <GameScreen />
        }
        else {
            return <WelcomeScreen stateHandler={this.stateHandler} userName={this.state.userName} />
        }
    }
}

export default Main;