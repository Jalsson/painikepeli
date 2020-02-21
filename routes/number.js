const express = require("express");
const router = express.Router();
const fs = require("fs");
let counter = 0;

function User(key, points) {
    this.key = key;
    this.points = points;
}

let users = loadUsers();

router.get("/", (req, res) => {
    let points;

    if (!users.find(x => x.key === req.cookies.userID)) {
        let userID = makeid(25);
        while(users.find(x => x.key === userID)){
            userID = makeid(25);
        }

        res.cookie('userID', userID, { maxAge: (365 * 24 * 60 * 60 * 1000) });

        users.push(new User(userID, 20))
        points = users.find(x => x.key === userID).points
    }
    else {
        points = users.find(x => x.key === req.cookies.userID).points
    }
    saveUsers(users);
    res.json({ "points": points })

})

router.get("/pressButton", (req, res) => {
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
        console.log("jaollinen 10" + (counter % 500))
        users[userIndex].points += 250;
    }
    else if (remain100 === 0) {
        console.log("jaollinen 10" + (counter % 100))
        users[userIndex].points += 40;
    }
    else if (remain10 === 0) {
        console.log("jaollinen 10" + (counter % 10))
        users[userIndex].points += 5;
    }

    saveUsers(users);
    res.json({
        "points": users[userIndex].points,
        "countToNext": Math.min(...remains)
    })
})

function loadUsers() {
    let rawdata = fs.readFileSync('userFile.txt');
    let data = JSON.parse(rawdata);
    return data;

}

function saveUsers(users) {
    fs.writeFile('userFile.txt', JSON.stringify(users), function (err) {
        if (err) throw err;
    });
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;