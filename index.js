const express = require('express')
const cookieParser = require('cookie-parser');
// Create the server
const app = express()
app.use(cookieParser());

app.use("/number", require("./routes/number"));

// Choose the port and start the server
const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
  console.log(`Hosting on port ${PORT}`)
})

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'nappulapeli-frontend/build')))
// Anything that doesn't match the above, send back index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/nappulapeli-frontend/build/index.html'))
})
