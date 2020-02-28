# Painikepeli

## Notes
- This is a project for Vincit ([the assigment](https://koodarijahti.fi/Ennakkotehtava_2020_Painikepeli.pdf))
- You can test the game at https://nappulapeli.herokuapp.com/
- Multiplayer game on a browser where you press the button to earn points.
- **Note** Heroku(hosting site) puts the app to sleep after some time so the first view is slow. 
  - If background image is not loading please refresh the page.
  
## How to play
Guide about how to play can be found from the site
  
 ## Features
 - View on mobile is as refined as the desktop experience
 - **Cookies**
    - This site uses one cookie to store a unique user to the server.
    - Player name is encoded to string and given back to user.
    - Player cannot change cookie to switch his username.
 - **React**
    - With React I used a lot of conditional rendering to reuse components and structure the app to small components
    - This was the first time I used React and benefits are immediately apparent when looking at ease of deploying compared to a traditional site with plain JS, HTML, CSS
- **Express.js**
  - The backend was made with Node.js component Express.js this was a powerful tool that I have used before in my earlier Node.js project
  - Node.js allows to add big new functionalities with very little effort and that's why it was an ideal choice for the backend



## How to setup
This project uses node.js to run so there is some files you need before you can run this locally.
- Install [Git](https://git-scm.com/downloads)
- Install [Node.js](https://nodejs.org/en/download/)
- Cd into the folder where you want to install project with console .
- Input command `git clone https://github.com/Jalsson/painikepeli.git` to download the project.
- Cd into **root** of the project where you can see `index.js` file and run the command `npm install` to install dependencies .
- Cd into **/nappulapeli-frontend** folder and run command `npm install` to install dependencies .

## Run the development build
- Cd into **root** of the project where you can see `index.js` file and run command `npm start` or `nodemon index.js` 
- Cd into **/nappulapeli-frontend** folder and run command `npm run start`
- Wait until everything is started and navigate to http://localhost:3000/
 

