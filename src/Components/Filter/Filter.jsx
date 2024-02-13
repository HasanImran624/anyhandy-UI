import React from 'react';
import './Filter.css';

const Filter = ({ name, backgroundColor, textColor }) => {
  return (
    <div className="filter-container">
      <div className='filter' style={{ background: backgroundColor }}>
        <p className='filter-text' style={{ color: textColor }}>
          {name}
        </p>
      </div>
    </div>
  );
}

export default Filter;
