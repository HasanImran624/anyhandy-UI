import React from 'react';
import './Footer.css';
import Logo from '../../Assets/logo.svg'
import Facebook from '../../Assets/Facebook.svg'
import Twitter from '../../Assets/Twitter.svg'
import Linkedin from '../../Assets/Linkedin.svg'
export const Footer = () => {
  return (
    <>
    <footer className="footer-container">
    <div className="footer-content">
    <div className="left-section">
      <div className="logo-container">
        {/* Insert your company logo image here */}
        <img src={Logo} alt="" />
      </div>
      <div className="social-media-container">
        {/* Insert your social media icons/images here */}
        <img src={Twitter} alt="Social Icon 1" />
        <img src={Facebook} alt="Social Icon 2" />
        <img src={Linkedin} alt="Social Icon 3" />
      </div>
    </div>
    <div className="right-section">
      <div className="footer-menu">
        <p className="menu-heading">Our Company</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Contact Us Us</p>
      </div>
      <div className="footer-menu">
        <p className="menu-heading">Our Services</p>
        <p>Plumbing Services</p>
        <p>Electrical Services</p>
        <p>Carpentry Service</p>
        <p>Painting Services</p>
        <p>Home Cleaning</p>
      </div>
      <div className="footer-menu">
        <p className="menu-heading">Get in Touch</p>
        <p>123 456 7789 10</p>
        <p>007 popie, New City, USA</p>
      </div>
    </div>
      </div>
    <div className="line-after-footer"></div>
    <div>
        <p>Design with by anyhand. All Rights Reserved</p>
    </div>
  </footer>
  </>
);
}



