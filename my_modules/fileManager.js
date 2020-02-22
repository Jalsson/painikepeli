const fs = require("fs");

module.exports = { 
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