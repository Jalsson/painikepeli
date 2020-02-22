const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypt = require("../my_modules/crypter");
const fm = require("../my_modules/fileManager")
let counter = 0;




router.get("/", (req, res) => {

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
        console.log("jaollinen 500 " + (counter % 500))
        users[userIndex].points += 250;
    }
    else if (remain100 === 0) {
        console.log("jaollinen 100 " + (counter % 100))
        users[userIndex].points += 40;
    }
    else if (remain10 === 0) {
        console.log("jaollinen 10 " + (counter % 10))
        users[userIndex].points += 5;
    }

    saveUsers(users);
    res.json({
        "points": users[userIndex].points,
        "countToNext": Math.min(...remains)
    })
    res.status(200).end
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



module.exports = router;