import React from 'react'
import './css/Main.css'
import './css/SideBars.css'
import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'

// main root for our app, here we render hole page
function App() {
  return (
    <div>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App
