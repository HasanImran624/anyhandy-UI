import React from 'react';
import './Review.css';
import { ReviewBox } from './ReviewBox';
import Rectangle_1 from '../../Assets/Rectangle_1.png';
import Review_img_1 from '../../Assets/Review_img_1.png'; 
import Rectangle_2 from '../../Assets/Rectangle_2.png';
import Review_img_2 from '../../Assets/Review_img_2.png'; 
import Rectangle_3 from '../../Assets/Rectangle_3.png';
import Review_img_3 from '../../Assets/Review_img_3.png'; 

export const Review = () => {
    return (
      <div className="review-container space-y-20">
        <span className='space-y-5'>
          <p className='top-heading'>The Most Popular Heros</p>
          <p className='heading-text'>Lorem ipsum dolor sit amet consectetur. Proin donec pulvinar malesuada consequat purus integer congue. Pulvinar tincidunt.</p>
        </span>
        <div className="reviews-row">
          <ReviewBox rectangleImage= {Rectangle_1} heroImage={Review_img_1}/>
          <ReviewBox rectangleImage= {Rectangle_2} heroImage={Review_img_2}/>
          <ReviewBox rectangleImage= {Rectangle_3} heroImage={Review_img_3}/>
        </div>
      </div>
    );
  };
  