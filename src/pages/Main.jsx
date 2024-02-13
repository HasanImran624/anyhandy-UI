import React from 'react';
import { Navbar } from '../Components/Navbar/Navbar';
import { Home } from '../Components/Home/Home';
import { About } from '../Components/About/About';
import { Package } from '../Components/Package/Package';
import { Footer } from '../Components/Footer/Footer';
import { Review } from '../Components/Review/Review';
import { FAQs } from '../Components/FAQs/FAQs';

export const Main = () => {
    return (
        <div>
            <Navbar /> 
            <Home /> 
            <About />     
             <Package /> 
            <Review />
            <FAQs />
            <Footer />
            
        </div>
      )
}
