const fs = require("fs");

module.exports = { 

    //<---------------------  Simple methods using fs that save and load data, these parse data ready before returning it  ------------------------------>
    loadFile(file) {
        let rawdata = fs.readFileSync(file);
        let data = JSON.parse(rawdata);
         return data;
    },

    saveFile(path,data) {
        fs.writeFileSync(path, JSON.stringify(data), function (err) {
            if (err) throw err;
        });
    }

}