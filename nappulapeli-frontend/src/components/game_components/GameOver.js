import React, { Component } from 'react';

function GameOver(props) {
    
        return(
            <div style={{position: "absolute",left:"50%"}}>
                <div className="welcome-content-body lose-game-body">
                    <h1>You have lost</h1>
                    <h2>But don't worry, by clicking button below you can reset your score to 20 and start again!</h2>
                    <button className="nameInputButton" style={{fontSize:"150%"}} onClick={() => props.resetPoints()} > Reset score</button>
                </div>
            </div>
        )
    }

export default GameOver;