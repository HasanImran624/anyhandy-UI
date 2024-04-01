import React from "react";
import fake from '../../../Assets/fakeUser.png'
import { RatingStars } from "../../Rating/RatingStars";
import { HiBriefcase } from "react-icons/hi";
import JobsListing_css from '../JobListing/JobsListing.css';

function HeroListing({ image, name, rating, totalJobs, serviceTag }) {
    return (
        <div>
            <hr className='my-4' />
            <div className=" t1_main_row">
                <div class="container_t1_hero">
                    <div class="image-div_t1_hero">
                        <img src={image} className='rounded-full t1_hero_pro_img' width='44' height='44' alt="" />
                    </div>
                    <div class="text-div_t1_hero">
                        <div className='px-3'>
                            <div className="flex items-center mb-2" id="t1_hero_flex">
                                <h1 className='text-xl font-semibold'>{name}</h1>
                                <span className='px-2 t1_hero_rating'><RatingStars rating={rating} /></span>
                            </div>
                            <div className='text-[#00CF91] mb-2 w-fit text-center px-4 bg-[#f2fdfa] font-semibold rounded-full'>{serviceTag}</div>
                            <div className='flex text-[#7979FF] t1_hero_job_com'>
                                <HiBriefcase />
                                <p className='text-sm px-2'>{totalJobs} jobs Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-self-end items-start">
                    <button className='font-semibold text-[#00CF91] p-1'>Profile</button>
                </div>

            </div>
        </div>
    )
}

export default HeroListing;



{/* <div>
                    <div className="t1_hero_pro_img_con">
                        <img src={image} className='rounded-full t1_hero_pro_img' width='44' height='44' alt="" />
                    </div>
                    <div className='px-3'>
                        <div className="flex items-center mb-2">
                            <h1 className='text-xl font-semibold'>{name}</h1>
                            <span className='px-2'><RatingStars rating={rating} /></span>
                        </div>
                        <div className='text-[#00CF91] mb-2 w-fit text-center px-4 bg-[#f2fdfa] font-semibold rounded-full'>{serviceTag}</div>
                        <div className='flex text-[#7979FF]'>
                            <HiBriefcase />
                            <p className='text-sm px-2'>{totalJobs} jobs Completed</p>
                        </div>
                    </div>
                </div> */}