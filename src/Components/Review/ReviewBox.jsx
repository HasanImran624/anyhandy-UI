import React from 'react';
import './ReviewBox.css';
import { RatingStars } from '../Rating/RatingStars';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa'; // Import the location and clock icons from Font Awesome
import Rectangle_1 from '../../Assets/Rectangle_1.png';
import Review_img_1 from '../../Assets/Review_img_1.png'; 
import Filter from '../Filter/Filter';

export const ReviewBox = () => {
    return (
        <div className="reviewBox_container">
            <div className='subreviewBox'>
                <div className='reviewBox_layout'>
                    <div className='reviewBox_structure'>
                        <div className='image-container'>
                            <img src={Rectangle_1} className='rectangle-image' />
                            <img src={Review_img_1} className='review-image' />
                            <div className='text-over-image'>
                                <RatingStars />
                                <div className='reviewBox_heading'>John Doe</div>
                                <Filter name="Plumber" backgroundColor="white" textColor="#00CF91" />
                                <div className='para_detail'>Lorem ipsum dolor sit amet consectetur. Nunc in commodo.</div>
                                <div className='para_detail'>
                                    <FaMapMarkerAlt /> Location
                                    <span style={{ marginLeft: '10px' }}>
                                        <FaClock /> 10AED/hr
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
