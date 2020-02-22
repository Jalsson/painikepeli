const express = require("express");
const router = express.Router();
const crypt = require("../my_modules/crypter");
const fm = require("../my_modules/fileManager")
const User = require("../models/User")

router.get("/", (req, res) => {


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
    res.status(200).end;
})


router.post("/username", (req, res) => {
    submittedName = req.body.userName;
    encodedName = crypt.enCode(submittedName);
    if (encodedName == null) {
        res.json({
            "status": "wrongCharacters"
        })
        res.status(201).end;
        return;
    }

    let users = fm.loadFile("userFile.txt");
    if (users.find(x => x.key === encodedName)) {
        res.json({
            "status": "failure"
        });
        res.status(201).end;
        return;
    }
    else{
        res.cookie('userID', encodedName, { maxAge: (365 * 24 * 60 * 60 * 1000) });
        res.json({
            "status": "success",
        });
        console.log("setting new name")
        users.push(new User(encodedName, 20))
        fm.saveFile("userFile.txt",users);
        res.status(201).end;
        
    }
})

module.exports = router;