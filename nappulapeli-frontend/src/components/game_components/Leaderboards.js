import React, { Component } from 'react';
import {Player} from '../models/Player'



class LeaderBoards extends Component{

    constructor(){
        super()
        this.state = {
            players: []
        }
        
    }

    componentDidMount() {
        fetch(window.location.href + "game/leaderboard")
            .then(response => response.json())
            .then(data => {
                // we create temp array before we set state, we get every item from data and loop thourgh it
                // and it inside our own array so we can manipulate the data and arrange it by score
                let tempArray = []
                for (let i = 0; i < data.users.length; i++) {
                    tempArray.push(new Player(data.users[i].key,data.users[i].points))
                }
                tempArray.sort(function(a, b){
                    return a.score-b.score
                })
                tempArray.reverse();
                this.setState({
                    players: tempArray
                })
            })
    }

    render() {
        // we put all the array elements inside a list
        const listItems = this.state.players.map((d) => <li key={d.key}>{d.key} {d.score}p</li>);    
        return(
            <div className="fade-in">
                <h1 style={{color:"white",marginBottom: 0}}>Top players</h1>
                <ol>
                 {listItems}
                 </ol>
            </div>
            
        )
    }
}

export default LeaderBoards;