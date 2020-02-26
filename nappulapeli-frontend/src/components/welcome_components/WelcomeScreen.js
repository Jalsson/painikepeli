import React, { Component } from 'react';
import NameInput from './NameInput'
import GameInfo from './GameInfo'
import Cookies from 'js-cookie';

class WelcomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            renderedPage: 'nameInput',
            askWelcome: ""
        }
        this.setPage = this.setPage.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    setPage(page) {
        this.setState({
            renderedPage: page
        })
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
    }

    render() {
        let selectedButton ='col sub-menu-button selected-clor'
        let unSelectedButton = 'col sub-menu-button unselected-clor'
        if (this.props.userName != null) {
        return (
            <div className="welcome-content-body">
                <h1>Nice to see you again {this.props.userName}!</h1>
                
                <h2>Here are the game rules for refresh :)</h2>
                <GameInfo/>
                <p>Press here to start playing
                <button
                style={{marginLeft:30}} 
                onClick={() => {this.props.stateHandler("page","game"); 
                if(this.state.askWelcome === true) {Cookies.set('noWelcome', false, {expires: 9999} )} }}>continue</button></p>
                <p><b>Dont show me this screen anymore</b>
                    <input 
                    type="checkbox"
                    name="askWelcome" 
                    checked={this.state.askWelcome} 
                    onChange={this.handleChange} 
                    />
                </p>
            </div>
            )
        }
        else{
            return(
                <div className="welcome-content-body">
                <div className="row">
                    <div
                    className={this.state.renderedPage === "nameInput" ? selectedButton: unSelectedButton} 
                    onClick={() => this.setPage('nameInput')}>
                        <h2>Registeration</h2>
                    </div>
                    <div id="info" 
                    className={this.state.renderedPage === "nameInput" ? unSelectedButton: selectedButton} 
                    onClick={() => this.setPage('info')}> <h2>How to play</h2> </div>
                </div>
                {this.state.renderedPage === "nameInput" ? <NameInput stateHandler={this.props.stateHandler}/>: <div><h1>Button game</h1> <GameInfo/> <h2>Happy scoring ;)</h2> </div>}
                </div> 
            )
        }

    }
}

export default WelcomeScreen;

