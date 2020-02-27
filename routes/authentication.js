const express = require("express");
const router = express.Router();
const crypt = require("../my_modules/crypter");
const fm = require("../my_modules/fileManager")
const User = require("../models/User")

// gets 
router.get("/", (req, res) => {

    //using file manager's loadfile function that parses the 
    let users = fm.loadFile("userFile.txt");
    let points = null;
    let username = null;

    //if user's cookie is not found on our file system we give null for return. this way client knows to ask's for username
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
    res.status(200).end;
})

// This is called when client want's to insert new username to input
router.post("/username", (req, res) => {

    //first we try to encode the clients name, encoder takes care of the validity checks it returns null if the string is not valid
    submittedName = req.body.userName;
    encodedName = crypt.enCode(submittedName);

    //if string was wrong type or too long we send error response
    if (encodedName == null) {
        res.json({
            "status": "wrongCharacters"
        })
        res.status(201).end;
        return;
    }

    // if name already exits we send failure response
    let users = fm.loadFile("userFile.txt");
    if (users.find(x => x.key === encodedName)) {
        res.json({
            "status": "failure"
        });
        res.status(201).end;
        return;
    }
    // otherwise we send success and push it to the array
    else {
        res.cookie('userID', encodedName, { maxAge: (365 * 24 * 60 * 60 * 1000) });
        res.json({
            "status": "success",
        });
        users.push(new User(encodedName, 20))
        fm.saveFile("userFile.txt", users);
        res.status(201).end;
    }
})

module.exports = router;