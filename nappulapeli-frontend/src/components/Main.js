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

    componentDidMount() {
        console.log(window.location.origin);
        fetch(window.location.href + "authentication")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    userName: data.username
                })
            })
    }

    render() {

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