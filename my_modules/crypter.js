const fm = require("../my_modules/fileManager");
const fs = require("fs");


// loads random keys from textfile 
function loadKeys(){
    try {
        if(fs.existsSync('my_modules/keySet.txt')) {
        } else {
            // if we dont find it, we create the new one and save it
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

//makes random id's copied from stack overflow
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
        //all available characters that can be used in name, not including numbers atm
        const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','å','ä','ö','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Å','Ä','Ö'];
        
        // if string is too long we return null
        if (string.length > 15 || string.length < 1) {
            return null;
        }

        // also if there is invalid characters in our string we must return NULL
        for (let i = 0; i < string.length; i++) {
            if (characters.indexOf(string.charAt(i)) < 0) {
                return null;
            }
        }

        
        //<---------------------------------Here is all the encoding code, it gives each character unigue code and jumps the array acording to lenght of given input---------->
        
        let encodedKeys = loadKeys();
        let jumpNumber = 1;
        let encodedString = "";
        for (var i = 0; i < string.length; i++) {
            jumpNumber = jumpNumber * (characters.indexOf(string.charAt(i)) + 10)
        }
        jumpNumber = (jumpNumber % 58)+1;
        for (let i = 0; i < string.length; i++) {
            let tempJumpKey = jumpNumber
            if ((characters.indexOf(string.charAt(i)) + jumpNumber) >= 58) {
                tempJumpKey = (characters.indexOf(string.charAt(i)) + jumpNumber) - 58;
            }
            else{
                tempJumpKey = (characters.indexOf(string.charAt(i)) + jumpNumber);
            }
            encodedString += encodedKeys[tempJumpKey];
            
        }
        if (jumpNumber < 11) {
            jumpNumber = "0"+jumpNumber.toString();
        }
        encodedString = encodedString.concat(jumpNumber.toString());

        return encodedString;
        
    },

    deCode(string){

        //<---------------------------------------Here is we go backwards in our code and decode the key back to username-------------------------------------------------->
        
        
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
                
                tempJumpKey = 58 + (-1*(jumpNumber - key)) 
                
                if (jumpNumber == key) {
                    tempJumpKey = 0;
                }
            }
            else{
                tempJumpKey = key - jumpNumber;
            }
            deCodedString = characters[tempJumpKey] + deCodedString;
        }
        return deCodedString;
    }

}

