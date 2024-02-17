import React from 'react';
import './Review.css';
import { ReviewBox } from './ReviewBox';

export const Review = () => {
    return (
      <div className="review-container">
        <p className='top-heading'>The Most Popular Heros</p>
        <p className='heading-text'>Lorem ipsum dolor sit amet consectetur. Proin donec pulvinar malesuada consequat purus integer congue. Pulvinar tincidunt.</p>
        <div className="reviews-row">
          <ReviewBox/>
          <ReviewBox/>
          <ReviewBox/>
        </div>
      </div>
    );
  };
  