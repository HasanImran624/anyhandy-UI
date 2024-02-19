import React from 'react';
import './Package.css';
import Filter from '../Filter/Filter';
import { Category } from './Category';

export const Package = () => {
  return (
    <>
      <div className="package-container gap-5 sm_desktop:gap-10">
        <p className="package-heading mt-12">Find Packges</p>
        <div className='detail-text-group'>
          <p className='detail-text sm_desktop:w-fit'>Lorem ipsum dolor sit amet consectetur. Proin donec pulvinar malesuada consequat purus integer congue. Pulvinar tincidunt consequat purus integer congue.</p>
          <div className='button-group cursor-pointer hover:shadow-md transition ease-in-out duration-100'>
            <p className='button-text py-2'> View More</p>
          </div>
        </div>
        <div className='filters'>
          <Filter name="Home Cleaning" backgroundColor="#00CF91" textColor="white" />
          <Filter name="Electrical" backgroundColor="#ffff" textColor="#0D0B01" />
          <Filter name="Painting" backgroundColor="#ffff" textColor="#0D0B01" />
          <Filter name="Plumbing" backgroundColor="#ffff" textColor="#0D0B01" />
          <Filter name="Pest Control" backgroundColor="#ffff" textColor="#0D0B01" />
          <Filter name="HVAC" backgroundColor="#ffff" textColor="#0D0B01" />
          <Filter name="Carpentary Services" backgroundColor="#ffff" textColor="#0D0B01" />
        </div>
        <div id='categories_con'>
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
      </div>
    </>
  )
}
