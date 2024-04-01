import React, { useEffect, useState } from "react";
import JobListing_css from './JobsListing.css';
import Moment from 'moment';

function JobsListing(
    {
        service,
        startDate,
        endDate,
        image,
        name,
        serviceTag,
        status,
        milestone,
        statusClass
}) {

    const [startDate1, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(()=> {
        setStartDate(Moment(startDate).format('MMM DD, YYYY'));  
        setDueDate(Moment(endDate).format('MMM DD, YYYY'));
    },[])
  return (
      <div>
          <hr className='my-4'/>
          <div className="w-full grid-cols-12 container_job_list">
              <div className="col-span-5">
                  <h3 className='font-semibold text-lg'>{service}</h3>
                  <h3 className='text-gray-500 text-sm'>Started on {startDate1}</h3>
                  <h3 className='text-gray-500 text-sm'>Due on {dueDate}</h3>
              </div>
              <div className='col-span-4 t1_profile_' >
                  <div className="flex">
                      <div>
                          <img src={image} className='rounded-full t1_img_profile' width='40' height='40' alt=""/>
                      </div>
                      <div className='px-2'>
                          <h1 className='text-xl font-semibold mb-2 t1_name_'>{name}</h1>
                          <div className='text-[#00CF91] text-center px-3 font-semibold rounded-full t1_service_tag whitespace-nowrap'>{serviceTag}</div>
                      </div>
                  </div>
              </div>
              <div className='col-span-3 flex flex-col'>
                  <span className={statusClass} id="t1_status">{status}</span>
                  <h1 className='font-semibold text-lg'>{milestone}</h1>
                  <h3 className='text-gray-500 text-sm'>Due on {dueDate}</h3>
              </div>
          </div>
      </div>
  )
}

export default JobsListing;
