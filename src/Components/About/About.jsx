import React from 'react';
import './About.css';
import Line_1 from '../../Assets/Line_1.png';
import About_Img_1 from '../../Assets/About_Img_1.png';
import home_cleaning_img from '../../Assets/home_cleaning.png';

export const About = () => {
    return (
        <div className='about-container'>
            <div className='about-container-left'>
                <div className='group'>
                    <div className='heading'>
                        <p>What are you looking for?</p>
                    </div>
                    <div className='detail-section'>
                        <div className='detail-section-content'>
                            <img src={Line_1} className='image' />
                            <p className='text'>The Highest Standards</p>
                        </div>
                        <p className='content'>Lorem ipsum dolor sit amet consectetur. Proin donec pulvinar malesuada consequat purus integer congue. </p>
                    </div>
                    <img src={About_Img_1}/>
                </div>
            </div>
            <div className='about-container-right'>
                <div className='services-group'>
                    <div className='services'>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div><div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='services-group'>
                    <div className='services'>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='services-group'>
                    <div className='services'>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={home_cleaning_img}/>
                                <p className='text'>Home Cleaning</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        <div></div>
        </div>
      )
}
