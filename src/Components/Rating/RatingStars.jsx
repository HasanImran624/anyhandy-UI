import React from 'react';
import { FaStar } from 'react-icons/fa';

export const RatingStars = () => {
  const starStyle = {
    color: 'yellow', // Set the color to yellow
  };
    return (
      <div className="rating-stars flex">
        {[...Array(5)].map((_, index) => (
        <FaStar key={index} style={starStyle} />
        ))}
      </div>
    );
  };
  