import React from 'react';
import { FaStar } from 'react-icons/fa';

export const RatingStars = () => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
        <FaStar key={index} />
        ))}
      </div>
    );
  };
  