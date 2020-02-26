const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypt = require("../my_modules/crypter");
const fm = require("../my_modules/fileManager")
const User = require("../models/User")
let counter = 0;

router.get("/", (req, res) => {

})

router.get("/getPlayerInfo", (req, res) => {

    let users = fm.loadFile("userFile.txt");
    let points = null;
    let username = null;

    if (!users.find(x => x.key === req.cookies.userID)) {
        username = null;
        points = null;
    }
    else {
        points = users.find(x => x.key === req.cookies.userID).points
        username = crypt.deCode(req.cookies.userID)
    }
    res.json({
        "points": points,
        "username": username
    })
    res.status(201).end;

})

router.get("/pressButton", (req, res) => {
    let users = fm.loadFile("userFile.txt");
    let userIndex
    for (let i = 0; i < users.length; i++) {
        if (users[i].key === req.cookies.userID) {
            userIndex = i;
            users[userIndex].points--;
            break;
        }
    }
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
    res.json({
        "points": users[userIndex].points,
        "countToNext": Math.min(...remains)
    })
    res.status(200).end
})

router.get("/resetPoints", (req, res) => {
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
    res.json({
        "points": users[userIndex].points
    })
    res.status(200).end
})

router.get("/leaderboard", (req, res) => {
    let users = fm.loadFile("userFile.txt");
    let decodedUsers = [];
    for (let i = 0; i < 10; i++) {
        if (users[i]) {
            decodedUsers.push(new User(crypt.deCode(users[i].key), users[i].points))
        }
    }
    
    res.json({
        "users": decodedUsers
    })
    res.status(200).end
})

function saveUsers(users) {
    fs.writeFile('userFile.txt', JSON.stringify(users), function (err) {
        if (err) throw err;
    });
}

module.exports = router;