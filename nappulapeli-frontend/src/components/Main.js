import React, { Component } from 'react';

class Main extends Component{
    constructor () {
        super()
        this.state = {
            points: 0,
            countToNext: 0
        }
        this.fetchPressButton = this.fetchPressButton.bind(this)
    }


    componentDidMount() {
        fetch(window.location.href+"number")
        .then(response => response.json())
        .then(data => {
            this.setState({
                number: data.points
            })
        })
    }

     fetchPressButton(params) {
        fetch(window.location.href+"number/pressButton")
        .then(response => response.json())
        .then(data => {
            this.setState({
                number: data.points,
                countToNext: data.countToNext
            })
        })
    }

       


    render() {
        return (
            <div>
                {this.state.number}
                <button onClick={this.fetchPressButton}>press it</button>
                {this.state.countToNext}
            </div>
        )
    }
}

export default Main;