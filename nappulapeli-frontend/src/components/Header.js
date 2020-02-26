import React from 'react';
import Logo from '../images/logo.png'


function Header() {
  return (
    <div className="Header">
       <img src={Logo} className="logo" alt="Logo" /> 
    </div>
  );
}

export default Header
