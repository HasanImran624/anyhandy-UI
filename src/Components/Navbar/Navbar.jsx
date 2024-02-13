import React from 'react';
import './Navbar.css';
import Logo from '../../Assets/logo.svg'
export const Navbar = () => {
  return (

    <>
      <div className="nav-container">
        <div className="nav-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="navbar-links-container">
          <a href="" className="home-link">Home</a>
          <a href="">Services</a>
          <a href="">About</a>
          <a href="">Blog</a>
          <a href="">Contact</a>
        </div>
        <div className="navbar-links-container">
          <a href="">Sign In</a>
          <a href="" className="home-link">Sign Up</a>
        </div>
      </div>
    </>
  )
}
