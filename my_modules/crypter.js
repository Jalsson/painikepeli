const fm = require("../my_modules/fileManager");
const fs = require("fs");



function loadKeys(){
    try {
        if(fs.existsSync('my_modules/keySet.txt')) {
        } else {
            let keys = [];
            while (keys.length < 59) {
                id = makeid(2)
                if(!keys.includes(id)){
                    keys.push(id)
                }
            }
            fm.saveFile("my_modules/keySet.txt",keys);
            
        }
    } catch (err) {
        console.error(err);
    }
    return fm.loadFile("my_modules/keySet.txt");
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

module.exports = { 

    enCode(string){
        const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','å','ä','ö','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Å','Ä','Ö'];
        
        let encodedKeys = loadKeys();
        let jumpNumber = 1;
        let encodedString = "";
        for (var i = 0; i < string.length; i++) {
            console.log(characters.indexOf(string.charAt(i)) + 2)
            jumpNumber = jumpNumber * (characters.indexOf(string.charAt(i)) + 2)
        }
        jumpNumber = (jumpNumber % 58)+1;
        console.log("jumpnumber "+jumpNumber);
        for (let i = 0; i < string.length; i++) {
            let tempJumpKey = jumpNumber
            if ((characters.indexOf(string.charAt(i)) + jumpNumber) >= 58) {
                tempJumpKey = (characters.indexOf(string.charAt(i)) + jumpNumber) - 58;
            }
            else{
                tempJumpKey = (characters.indexOf(string.charAt(i)) + jumpNumber);
            }
            console.log("temp namber "+jumpNumber)
            console.log((characters.indexOf(string.charAt(i)) + jumpNumber));
            console.log("temp jump Key "+tempJumpKey)
            encodedString += encodedKeys[tempJumpKey];
            
        }
        if (jumpNumber < 11) {
            jumpNumber = "0"+jumpNumber.toString();
        }
        encodedString = encodedString.concat(jumpNumber.toString());
        console.log("encoded "+encodedString);
        this.deCode(encodedString);
    },

    deCode(string){
        const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','å','ä','ö','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Å','Ä','Ö'];
        let encodedKeys = loadKeys();

        deCodedString = "";
        jumpNumber =  string.substr(string.length - 2);
        name = string.substr(0, string.length - 2);
        
        while(name.length > 1){
            tempJumpKey = jumpNumber;
            key = encodedKeys.indexOf(name.substr(name.length-2));
            name = name.substr(0, name.length -2);
            if ((key - jumpNumber) < 0) {
                
                console.log("jumpnumber "+jumpNumber)
                console.log("key "+key)
                console.log("tempkey "+ (-1*(jumpNumber - key)) )
                tempJumpKey = 58 + (-1*(jumpNumber - key)) 
                
                if (jumpNumber == key) {
                    tempJumpKey = 0;
                }
                console.log(tempJumpKey)
            }
            else{
                console.log("jumpnumber "+jumpNumber)
                console.log("key "+key)
                tempJumpKey = key - jumpNumber;
            }
            deCodedString = characters[tempJumpKey] + deCodedString;
            console.log(tempJumpKey)
            console.log(deCodedString)
        }
        
    }

}

