import React from 'react';
import './Filter.css';

export const Filter = ({ name }) => { 
  return (
    <>
        <div className="filter-container">
            <div className='filter'>
                <p className='filter-text'>
                    {name} 
                </p>
            </div>
        </div>
    </>
  )
}
