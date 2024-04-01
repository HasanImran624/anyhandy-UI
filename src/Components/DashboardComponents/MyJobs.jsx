import React, { useEffect, useState } from "react";
import JobsListing from "../DashboardComponents/JobListing/JobsListing";
import fakeImg from '../../Assets/fakeUser.png'
import HeroListing from "../DashboardComponents/HeroListing/HeroListing";
import JobsListing_css from '../../Components/DashboardComponents/JobListing/JobsListing.css';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom'

function MyJobs({ Title }) {
    const navigate = useNavigate()

    const [recentJobsLst, setRecentJobslst] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        let url = `https://localhost:7046/api/dashboard/GetMyJobsDetailsWithUserID?UserID=${userId}`;
        axios.get(url).then(response => {
            let data = response.data.data;

            setRecentJobslst(data);

        }).catch(error => {
            console.log('Error', error);
        });
    }, [])

    return (
        <div className="w-full gap-x-8 py-4 mb-12 myJobLst_main_cont">
            <div className="w-full rounded-xl overflow-hidden border-2 hover:bg-white p-6">
                <div className="w-4/4 flex">
                    <div className="w-2/4">
                        <h2 className='text-2xl font-semibold t1_header_title'>{Title}</h2>
                    </div>
                    <div className="w-2/4 flex justify-end">
                        <button className='font-semibold text-[#00CF91] p-1' onClick={() => navigate('/myJobs')} >Show more</button>
                    </div>
                </div>
                <div className="job-listing">
                    {recentJobsLst.map((value, index) => (
                        <JobsListing
                            service={value.jobTitle}
                            startDate={value.postedDate}
                            endDate={value.dueDate}
                            name={value.userName}
                            serviceTag={value.serviceName}
                            status={'Active'}
                            milestone={'Milestone Title'}
                            image={value.userImg === '' ? fakeImg : value.userImg}
                            statusClass={'bg-[#00CF91] text-white py-1 px-3 rounded flex w-fit mb-1'}
                        />
                    ))}
                    {recentJobsLst.length === 0 &&
                        <div className="w-full py-56">
                            <h1 className="text-center font-bold text-2xl">No Record Found</h1>
                        </div>
                    }
                </div>
            </div>
            <div className="w-full rounded-xl overflow-hidden border-2 hover:bg-white px-4 py-6 t1_hero_main mt-5">
                <div className="flex">
                    <h2 className='text-2xl font-semibold'>Top Heroes</h2>
                </div>
                <HeroListing image={fakeImg} name={'John Doe'} rating={5} totalJobs={0} serviceTag={'Plumber'} />
                <HeroListing image={fakeImg} name={'John Doe'} rating={5} totalJobs={0} serviceTag={'Plumber'} />
                <HeroListing image={fakeImg} name={'John Doe'} rating={5} totalJobs={0} serviceTag={'Plumber'} />
            </div>
        </div>
    )
}


export default MyJobs;