import React from "react";
import './ProposalsReceived.css';
import Briefcase_Icon from '../../../Assets/briefcase_1.png';
import user_Icon from '../../../Assets/user_1.png';
import marker_pin_Icon from '../../../Assets/marker_pin.png';
import clock_Icon from '../../../Assets/clock.png';

function ProposalsReceived(
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
    return (
        <div>
            <hr className='my-4 m20' />

            <div className="w-full rounded-xl row hover:bg-white mt-10">
                <div className="containerP">
                    <div className="profile-conatiner">
                        <div className="txt-center">
                            <div className="profile-img">
                                <img src={image} className='rounded-full text-center' width='80' height='80' alt="" />
                            </div>

                            <div className='px-1' id="info-txt">
                                <h1 className='text-xl font-semibold mb-2'>{name}</h1>
                                <div className='text-[#00CF91] text-center px-3 font-semibold rounded-full' id="serviceTag">{serviceTag}</div>
                            </div>
                            <div className='px-1' id="info-txt">
                                <h4 className='txt-time font-semibold mb-2'> 3:47 local time </h4>
                                <h1 className='txt-dollar font-semibold mb-2'> 500$ </h1>
                            </div>
                        </div>
                    </div>

                    <div className="info-container" >
                        <div className="info-button-section">
                            <div>
                                <h2 className='text-2xl font-semibold'>Related Job Name</h2>
                                <p className=' font-semibold'>Received on Jul 15, 2024</p>
                                <div className="ds-flex mt-2 mb-3">
                                    <div className="flex items-center space-x-2">
                                        <img src={Briefcase_Icon} className="w-5 h-5 rounded-full" alt="Avatar" />
                                        <span className="text-sm font-normal">0 jobs completed</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mr-2 ml-2">
                                        <img src={user_Icon} className="w-4 h-4 rounded-full" alt="Avatar" />
                                        <span className="text-sm font-normal">individual</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <img src={marker_pin_Icon} className="w-4 h-4 rounded-full" alt="Avatar" />
                                        <span className="text-sm font-normal">London</span>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-2">
                                        <img src={clock_Icon} className="w-4 h-4 rounded-full" alt="Avatar" />
                                        <span className="text-sm font-normal">10AED/hr</span>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="btn-session">
                                <button className='font-semibold text-[#ffffff] p-1 btn-hire' >Hire</button>
                                <button className='font-semibold text-[#00CF91] p-1 btn-accept'>Accept</button>
                                <button className='font-semibold text-[#00CF91] p-1 btn-reject'>Reject</button>
                            </div>
                        </div>

                        <div className="info-msg-btn-container">
                            <div className="info-msg">
                                <p>Lorem ipsum dolor sit amet consectetur. Vulputate platea convallis auctor pulvinar rhoncus justo leo nunc. Orci mattis hac nisi volutpat pharetra. Facilisis in nibh tellus integer. Augue platea sodales id elit netus quis id. Turpis lacus odio sodales. <h5 className="text-[#00CF91]">Read More</h5> </p>
                            </div>

                        </div>
                        <div id="btn-session-end">
                            <button className='font-semibold text-[#ffffff] p-1 btn-hire' >Hire</button>
                            <button className='font-semibold text-[#00CF91] btn-accept'>Accept</button>
                            <button className='font-semibold text-[#00CF91] p-1 btn-reject'>Reject</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProposalsReceived;
