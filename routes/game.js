const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypt = require("../my_modules/crypter");
const fm = require("../my_modules/fileManager")
const User = require("../models/User")
let counter = 0;

// main route(/game) is not used for anything. feel free to add your own functionality here
router.get("/", (req, res) => {

})

// this is called when user presses the button in screen.
router.get("/pressButton", (req, res) => {

    // first we find the user and minus 1 point from clients score count.
    let users = fm.loadFile("userFile.txt");
    let userIndex
    for (let i = 0; i < users.length; i++) {
        if (users[i].key === req.cookies.userID) {
            userIndex = i;
            users[userIndex].points--;
            break;
        }
    }

    // Here we increase the counter and figure out if player is awarded any points
    counter++;
    let remain500 = (counter % 500);
    let remain100 = (counter % 100);
    let remain10 = (counter % 10);
    let remains = [(500 - remain500), (100 - remain100), (10 - remain10)]

    if (remain500 === 0) {
        console.log("jaollinen 500 " + (counter % 500));
        users[userIndex].points += 250;
    }
    else if (remain100 === 0) {
        console.log("jaollinen 100 " + (counter % 100));
        users[userIndex].points += 40;
    }
    else if (remain10 === 0) {
        console.log("jaollinen 10 " + (counter % 10));
        users[userIndex].points += 5;
    }
    saveUsers(users);

    // returning points and remaining count for the next award
    res.json({
        "points": users[userIndex].points,
        "countToNext": Math.min(...remains)
    })
    res.status(200).end
})

// Resetting user points, client calls this when it score is 0
router.get("/resetPoints", (req, res) => {

    // finding the right user and setting its points to 20
    let users = fm.loadFile("userFile.txt");
    let userIndex
    for (let i = 0; i < users.length; i++) {
        if (users[i].key === req.cookies.userID) {
            userIndex = i;
            users[userIndex].points = 20;
            break;
        }
    }
    saveUsers(users);

    // returning the score
    res.json({
        "points": users[userIndex].points
    })
    res.status(200).end
})

//returning the  list of 
router.get("/leaderboard", (req, res) => {
    let users = fm.loadFile("userFile.txt");

    //sorting user by score
    users.sort(function(a, b){
        return a.points-b.points
    })
    users.reverse();
    let decodedUsers = [];
    //pushing the users to a new list where their username can be seen
    for (let i = 0; i < 10; i++) {
        if (users[i]) {
            decodedUsers.push(new User(crypt.deCode(users[i].key), users[i].points))
        }
    }
    
    //responding with list
    res.json({
        "users": decodedUsers
    })
    res.status(200).end
})

// saves the users data to userFile.txt
function saveUsers(users) {
    fs.writeFile('userFile.txt', JSON.stringify(users), function (err) {
        if (err) throw err;
    });
}

module.exports = router;