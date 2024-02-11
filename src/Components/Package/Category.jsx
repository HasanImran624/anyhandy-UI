import React from 'react';
import './Category.css';
import Avatar from '../../Assets/Avatar.png';
import Rating from '../../Assets/Rating.png';

export const Category = () => {
  return (
    <>
      <div className="category_container">
        <div className='subcategory'>
          <div className='category_layout'>
            <div className='category_structure'>
                <p className='category_heading'>24 AED<span className='category_heading_price'>/Month</span></p>
                <p className='para_heading'>House Cleaning</p>
                <p className='para_detail'>Lorem ipsum dolor sit amet consectetur. Nunc in commodo.</p>
                <div className='avatar-group'>
                    <img className='avatar' src={Avatar} />
                    <div className='avatar-text-group'>
                        <p className='avatar-text'> Olivia Rhye</p>
                    </div>
                </div>

            </div>
          </div>
        </div>
       
      </div>
    </>
  )
}
