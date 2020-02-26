import React from 'react';


function GameInfo() {

        return (
            <div className="fade-in info-margin" style={{ backgroundColor: "rgb(61, 76, 151)",paddingTop: 10, paddingBottom: 10,color:"white"}}>
                <p>You have 20 points and a button that you can press.
                 Each time you press that button, it will cost you one point and the buttons count will increase.
                If your button press is one of the following you will be awarded followingly:</p>
                <ul className="list">
                    <li><b>5 </b>points every on every <b>10. </b>pressing</li>
                    <li><b>40</b> points every on every <b>100.</b> pressing</li>
                    <li><b>250</b> points every on every <b>500.</b> pressing</li>
                </ul>
                <p>You can win only one price per click, so if you hit 10 and 100 same time you will we be awarded the bigger price!</p>
                <p>You will also see the counters count everytime you click the button. If your score drops down to zero you can start over and return to 20 points</p>
            </div>
        )
}

export default GameInfo;