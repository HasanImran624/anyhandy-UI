import React from 'react';
import './Package.css';
import Filter from '../Filter/Filter';
import { Category } from './Category';

export const Package = () => {
  return (
    <>
      <div className="package-container">
        <p className="package-heading">Find Packges</p>
        <div className='detail-text-group'>
          <p className='detail-text'>Lorem ipsum dolor sit amet consectetur. Proin donec pulvinar malesuada consequat purus integer congue. Pulvinar tincidunt.</p>
          <div className='button-group'>
            <p className='button-text'> View More</p>
          </div>
        </div>
        <div className='filters'>
          <Filter name="Home Cleaning" backgroundColor="#00CF91" textColor="white" />
          <Filter name="Electrical" backgroundColor="#00CF91" textColor="white" />
          <Filter name="Painting" backgroundColor="#00CF91" textColor="white" />
          <Filter name="Plumbing" backgroundColor="#00CF91" textColor="white" />
          <Filter name="Pest Control" backgroundColor="#00CF91" textColor="white" />
          <Filter name="HVAC" backgroundColor="#00CF91" textColor="white" />
          <Filter name="Carpentary Services" backgroundColor="#00CF91" textColor="white" />
        </div>
        <div>
      {/* First row */}
      <div className="category-row">
        <Category />
        <Category />
        <Category />
      </div>
      {/* Second row */}
      <div className="category-row">
        <Category />
        <Category />
        <Category />
      </div>
      {/* Third row */}
      <div className="category-row">
        <Category />
        <Category />
        <Category />
      </div>
      </div>
      </div>
    </>
  )
}
