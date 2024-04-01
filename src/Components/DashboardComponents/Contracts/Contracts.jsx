import React from "react";
import './Contracts.css';
import briefcase_img from '../../../Assets/briefcase.png';
import Frame_img from '../../../Assets/Frame5.png';
import more_vertical_img from '../../../Assets/more-vertical.png';
import msg_img from '../../../Assets/message-circle.png';


function Contracts(
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

            <div className="w-full rounded-xl row hover:bg-white" style={{ marginTop: 20 }}>
                <div className="containerP_contracts">
                    <div className="profile-conatiner_contracts">
                        <div className="txt-center_contracts">
                            <div className="profile-img_contracts">
                                <img src={image} className='rounded-full text-center' width='80' height='80' alt="" />
                            </div>

                            <div className='px-1' id="info-txt_contracts">
                                <h1 className='text-xl font-semibold mb-2'>{name}</h1>
                                <div className='text-[#00CF91] text-center px-3 bg-[#f2fdfa] font-semibold rounded-full' id="serviceTag_contracts">{serviceTag}</div>
                            </div>
                            <div className='px-1' id="info-txt_contracts">
                                <h4 className='txt-time_contracts font-semibold mb-2'> 3:47 local time </h4>
                            </div>
                        </div>
                    </div>

                    <div className="info-container_contracts text-center">
                        <div className="info-button-section_contracts">
                            <div className="text-center">
                                <div className="txt3_contracts">
                                    <img src={briefcase_img} width='18' height='18' alt="" /> Related Job Name
                                </div>

                                <div className="ds-flex1_contracts ds-bl_contracts mt-2">
                                    <div className="m-r-f1_contracts">
                                        <p className='font-semibold txt-black_contracts text-black'>Contract Name</p>
                                    </div>
                                    <div className="m-r-f1_contracts mt-2">
                                        <button className='font-semibold text-[#00CF91] btn-acceped_contracts'> <span class="dot_contracts"></span> Accepted</button>
                                    </div>
                                </div>

                                <div className="ds-flex1_contracts">
                                    <div className="m-r-f1_contracts">
                                        <button className='font-semibold text-[#ffffff] p-1 btn-hire_contracts' >Active</button>
                                    </div>
                                    <div className="m-r-f1_contracts m-t1_contracts">
                                        <p className='font-semibold txt3_title_contracts'>Milestone title</p>
                                    </div>
                                    <div className="m-r-f1_contracts m-t1_contracts">
                                        <p className='txt2 text-[#96A0B5]'>Due on jul 15, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-session1_contracts">
                                <div className="ds-flex1_contracts">
                                    <div className="m-r-f1_contracts">
                                        <button className='font-semibold text-[#ffffff] p-1 btn-pay-now_contracts' >Pay Now</button>
                                    </div>
                                    <div className="m-r-f1_contracts btn-msg_contracts">
                                        <img src={Frame_img} width='30' height='30' alt="" />
                                    </div>
                                    <div className="m-r-f1_contracts btn-option_contracts">
                                        <img src={more_vertical_img} width='25' height='25' alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="info-msg-btn-container1_contracts info-container-about_contracts">
                            <div className="flex flex-col w-full md_tablet:flex-row">
                                <div className="flex justify-between text-center p-5 md_tablet:flex-1">
                                    <div>
                                        <h6>Start</h6>
                                        <h6 className="font-semibold">Jul 15, 2024</h6>
                                    </div>
                                    <div>
                                        <h6>Due on</h6>
                                        <h6 className="font-semibold">Jul 15, 2024</h6>
                                    </div>
                                </div>
                                <div className="flex justify-between text-center p-5 md_tablet:flex-1">
                                    <div>
                                        <h6>Value</h6>
                                        <h6 className="font-semibold">$10,000</h6>
                                    </div>
                                    <div>
                                        <h6>Paid</h6>
                                        <h6 className="font-semibold">$3,000</h6>
                                    </div>
                                </div>
                                <div className="flex justify-between text-center p-5 md_tablet:flex-1">
                                    <div>
                                        <h6>In Wallet</h6>
                                        <h6 className="font-semibold">$0</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="btn-session-end_contracts">
                            <button className='font-semibold text-[#ffffff] p-1 btn-pay-now_contracts' >Pay Now</button>

                            <button className="flex items-center justify-center px-4 py-2 rounded-md bg-white text-[#00CF91] font-semibold btn-acceped_contracts btn-acceped-bottom_contracts btn-filter-proposal">
                                <img src={msg_img} alt="Button Image" className="w-6 h-6 mr-2" />
                                Message
                            </button>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contracts;
