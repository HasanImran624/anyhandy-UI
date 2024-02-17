import React, {useState} from 'react'
import './Navbar.css';
import Logo from '../../Assets/logo.svg'
import Ham from '../../Assets/hamIcon.jpg'
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="nav-container">
        <div className="nav-logo-container">
          <img src={Logo} alt="logo" id='logo' />
        </div>
        <img src={Ham} alt="hamburger" className='hamburger_icon' onClick={() => setIsOpen(!isOpen)} />
        {
          isOpen && <div id="sidebar" onClick={() => setIsOpen(!isOpen)}>
            <div className="navbar-links-container-sidebar">
              <a href="" className="home-link">Home</a>
              <a href="">Services</a>
              <a href="">About</a>
              <a href="">Blog</a>
              <a href="">Contact</a>
            </div>
            <div className="navbar-links-container-sidebar">
              <a href="">Sign In</a>
              <a href="" className="home-link">Sign Up</a>
            </div>
          </div>
        }
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
