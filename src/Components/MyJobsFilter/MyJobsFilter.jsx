import React, { useState, useEffect } from "react";
import more_vertical_img from '../../../src/Assets/more-vertical.png';
import { HiBriefcase } from "react-icons/hi";
import Moment from 'moment';

function MyJobsFilter({ title, createdDate, closedDate, ProposalsCount, MessagesCount, HiredCount, key, Status }) {

    // const [closedDateFormated, setClosedDateFormated] = useState('');
    // const [createdDateFormated, setCreatedDateFormated] = useState('');

    // useEffect(() => {
    //     setClosedDateFormated(Moment(closedDate).format('MMM DD, YYYY'));

    //     const date = Moment(createdDate);
    //     const formattedDate = date.fromNow();
    //     setCreatedDateFormated(formattedDate);
    // }, [])

    const createDateFormat = (createdDate) => {
        const date = Moment(createdDate);
        const formattedDate = date.fromNow();
        return formattedDate;
    }

    return (
        <div>
            <hr className='my-4' />
            <div className="flex justify-between p-4 sm_mobile:block lg_mobile:justify-items-start  sm_tablet:block md_tablet:flex lg_tablet:flex sm_desktop:flex lg_desktop:flex" key={key}>
                <div >
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-xs sm_mobile: text-left"><span className="text-gray-500">Created </span> <span className="font-semibold">{createDateFormat(createdDate)}</span> | <span className="text-gray-500"> Closed </span> <span className="font-semibold">{Moment(closedDate).format('MMM DD, YYYY')}</span> </p>
                </div>
                <div class="flex sm_mobile:justify-end sm_mobile:mt-4 lg_mobile:justify-center">
                    <div className="px-7 text-center">
                        <h2 className="text-xl font-semibold">{ProposalsCount}</h2>
                        <p className="text-xs text-gray-500"> Proposals </p>
                    </div>
                    <div className="px-7 text-center">
                        <h2 className="text-xl font-semibold">{MessagesCount}</h2>
                        <p className="text-xs text-gray-500"> Messages </p>
                    </div>
                    <div className="px-7 text-center">
                        <h2 className="text-xl font-semibold">{HiredCount}</h2>
                        <p className="text-xs text-gray-500"> Hired </p>
                    </div>
                </div>
                <div className="flex sm_mobile:mt-8">
                    {Status == 1 && <button className="flex items-center justify-center px-3 py-2 rounded-md bg-[#00CF91] text-white font-semibold btn-filter-proposal sm_mobile:w-full sm_mobile:">Open</button> }
                    {Status == 2 && <button className="flex items-center justify-center px-3 py-2 rounded-md bg-[#EFA82A] text-white border border-yellow-400 font-semibold btn-filter-proposal sm_mobile:w-full sm_mobile:">Close</button> }
                    {Status == 3 && <button className="flex items-center justify-center px-3 py-2 rounded-md bg-[#96A0B5] text-white border border-gray-500 font-semibold btn-filter-proposal sm_mobile:w-full sm_mobile:">Cancelled</button> }
                    {Status == 4 && <button className="flex items-center justify-center px-3 py-2 rounded-md bg-red-600 text-white hover:text-red-700 border border-red-600 font-semibold btn-filter-proposal sm_mobile:w-full ">Deleted</button> }

                    <div className="m-r-f1_contracts pl-5 btn-option_contracts">
                        <img src={more_vertical_img} width='25' height='25' alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyJobsFilter;