import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { Home } from '../Components/Home/Home';
import { About } from '../Components/About/About';
import { Package } from '../Components/Package/Package';
import { Footer } from '../Components/Footer/Footer';
import { Review } from '../Components/Review/Review';

export const Main = () => {
    return (
        <div>
            <Navbar /> 
            <Home /> 
            <About />     
            <Package /> 
            <Review />
            <Footer /> 
            
        </div>
      )
}
