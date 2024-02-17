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
              <img src={Logo} alt="" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="social-media-container">
                <img src={Twitter} alt="Social Icon 1" />
                <img src={Facebook} alt="Social Icon 2" />
                <img src={Linkedin} alt="Social Icon 3" />
              </div>
              <p>Follow our Social Media</p>
            </div>
          </div>
          <hr className='mobile_HR'/>
          <div className="right-section">
            <div className="footer-menu">
              <h2 className="menu-heading">Our Company</h2>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Contact Us Us</p>
            </div>
            <div className="footer-menu">
              <h2 className="menu-heading">Our Services</h2>
              <p>Plumbing Services</p>
              <p>Electrical Services</p>
              <p>Carpentry Service</p>
              <p>Painting Services</p>
              <p>Home Cleaning</p>
            </div>
            <div className="footer-menu">
              <h2 className="menu-heading">Get in Touch</h2>
              <p>123 456 7789 10</p>
              <p>007 popie, New City, USA</p>
            </div>
          </div>
        </div>
        <section className="footer_bottom" style={{ maxWidth: '90vw' }}>
          <hr style={{ width: '90vw' }}/>
          <div className='copyrights'>
            <h4>Design by anyhand. All Rights Reserved.</h4>
            <h4>© 2024 anyhandy.com</h4>
          </div>
        </section>
      </footer>
    </>
  )
}



