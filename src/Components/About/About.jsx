import React from 'react';
import './About.css';
import Line_1 from '../../Assets/Line_1.png';
import About_Img_1 from '../../Assets/About_Img_1.png';
import home_cleaning_img from '../../Assets/home_cleaning.png';
import pest_control_img from '../../Assets/pest_control.png';
import counterpart_service_img from '../../Assets/counterpart_service.png';
import electric_service_img from '../../Assets/electric_service.png';
import plumbing_service_img from '../../Assets/plumbing_service_img.png';
import painting_services_img from '../../Assets/painting_services_img.png';
import general_service_img from '../../Assets/general_service_img.png';
import hvac_img from '../../Assets/hvac_img.png';
import landscap_img from '../../Assets/landscap_img.png';
import appliance_repair_img from '../../Assets/appliance_repair_img.png';

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
                                <img className='image' src={plumbing_service_img}/>
                                <p className='text'>Plumbing services</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={hvac_img}/>
                                <p className='text'>HVAC (Heating, Ventilation, etc)</p>
                            </div>
                        </div><div className='service-container'>
                            <div className='group'>
                                <img className='image' src={appliance_repair_img}/>
                                <p className='text'>Appliance Repairs</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='services-group'>
                    <div className='services'>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={electric_service_img}/>
                                <p className='text'>Electrical services</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={counterpart_service_img}/>
                                <p className='text'>Carpentry Services</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={landscap_img}/>
                                <p className='text'>Landscaping And Lawn Care</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='services-group'>
                    <div className='services'>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={painting_services_img}/>
                                <p className='text'>Painting Services</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={pest_control_img}/>
                                <p className='text'>Pest Control</p>
                            </div>
                        </div>
                        <div className='service-container'>
                            <div className='group'>
                                <img className='image' src={general_service_img}/>
                                <p className='text'>General Services</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        <div></div>
        </div>
      )
}