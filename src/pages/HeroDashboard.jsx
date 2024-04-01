import React, { useState } from "react";
import DashboardCard from "../Components/Cards/Dashboard Card/DashboardCard";
import { FaBriefcase } from "react-icons/fa";
import { FaRegSquareCaretDown } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import JobsListing from "../Components/DashboardComponents/JobListing/JobsListing";
import ProposalsReceived from "../Components/DashboardComponents/ProposalsReceived/ProposalsReceived";
import Contracts from '../Components/DashboardComponents/Contracts/Contracts';
import fakeImg from '../Assets/fakeUser.png'
import HeroListing from "../Components/DashboardComponents/HeroListing/HeroListing";
import MyJobs from "../Components/DashboardComponents/MyJobs";
import searchIcon from '../Assets/search.png';
import slidersIcon from '../Assets/sliders.png';

const HeroDashboard = () => {



  const [dashboardType, setDashboardType] = useState(0);
  const [sortby, setSortBy] = useState('hero_name');
  const [sortbyContact, setSortByContact] = useState('hero_name');

  const dashboardTypeClick = (tab) => {
    setDashboardType(tab);
  };
  return (
    <div className="px-[100px]" id="hero-dashboard-wapper">
      <div className="w-4/4 py-6 hero-dsh-header">
        <div className="w-2/4">
          <h2 className="text-3xl font-bold mb-3 hero-dsh-headerP">Hello James!</h2>
          <p className="text-gray-600 hero-dsh-headerP">Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="w-2/4 btn-wapper-dsh">
          <button className="btn-pj flex items-center text-white bg-green-500 hover:bg-green-600  py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-200 h-10">
            <AiOutlinePlusCircle className="mr-2" size={20} />
            <span className="text-sm font-semibold">Post A Job</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-x-8 py-4" id="h-scroll">
        <DashboardCard
          value={25}
          name={"My Jobs"}
          icon={<FaBriefcase className="text-white" />}
          iconColor={"bg-[#7979FF] p-2 rounded me-2"}
          dashboardTypeClick={() => dashboardTypeClick(0)}
          activeClass={dashboardType === 0 ? 'bg-white' : ''}
        />
        <DashboardCard
          value={20}
          name={"Proposals Received"}
          icon={<FaRegSquareCaretDown className="text-white" />}
          iconColor={"bg-[#EFA82A] p-2 rounded me-2"}
          dashboardTypeClick={() => dashboardTypeClick(1)}
          activeClass={dashboardType === 1 ? 'bg-white' : ''}
        />
        <DashboardCard
          value={15}
          name={"Contracts"}
          icon={<IoIosCheckmarkCircleOutline className="text-white" />}
          iconColor={" bg-[#00CF91] p-2 rounded me-2"}
          dashboardTypeClick={() => dashboardTypeClick(2)}
          activeClass={dashboardType === 2 ? 'bg-white' : ''}
        />
        <DashboardCard
          value={5}
          name={"Cancelled Jobs"}
          icon={<RxCrossCircled className="text-white" />}
          iconColor={"bg-[#FA2E2E] p-2 rounded me-2"}
          dashboardTypeClick={() => dashboardTypeClick(3)}
          activeClass={dashboardType === 3 ? 'bg-white' : ''}
        />
      </div>
      {(dashboardType === 0) ? <MyJobs Title={"Recent Jobs"} /> : ''}

      {(dashboardType === 1) ?

        <>

          <section id='navLinksContainer' className='hidden sm_desktop:block mt-4 mb-4 ml-5'>
            <ul className='flex items-start justify-start gap-7 text-[#0D0B01] font-Onest font-semibold text-lg'>
              <li> All </li>
              <li> ShortListed </li>
              <li> Messaged </li>
              <li>Archived</li>
            </ul>
          </section>

          <div className="flex align-middle mt-2">
            <div className="input-container_proposal">
              <img src={searchIcon} className='icon_proposal' width='20' height='20' alt="" />
              <input type="text" className="searchbar_proposal" placeholder=" Searching for..." />
            </div>
            <button className="btn-filter-proposal flex items-center px-4 py-2 text-green-500 rounded-md">
              <img src={slidersIcon} alt="Button Image" className="w-6 h-6 mr-2" />
              <span className="hideSpan_Dsh">Filters </span>
            </button>
          </div>

          <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap p-4">
            <span className="font-bold">Sort By:</span>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortby === 'date' ? 'text-green-500' : 'text-gray-400'}`} onClick={() => setSortBy('date')}>Date</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortby === 'hero_name' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortBy('hero_name')}>Hero Name</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortby === 'desc' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortBy('desc')}>Descending</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortby === 'asc' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortBy('asc')}>Ascending</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortby === 'lower_price' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortBy('lower_price')}>Lower Price</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortby === 'higher_price' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortBy('higher_price')}>Higher Price</button>
          </div>

          <div className="w-full flex gap-x-8 py-4 mb-12">
            <div className="w-full rounded-xl overflow-hidden border-2 hover:bg-white p-6" id="container_wapper">
              <div className="w-4/4 flex">
                <div className="w-2/4" id="container_title">
                  <h2 className='text-2xl font-semibold' >Proposals Received <span className="text-gray-400 p-2">20</span> </h2>
                </div>
                {/* <div className="w-2/4 flex justify-end">
                      <button className='font-semibold text-[#00CF91] p-1'>Show more</button>
                  </div> */}
              </div>
              <div className="job-listing">
                <ProposalsReceived
                  service={'Painting Services Needed'}
                  startDate={'Jul 15, 2024'}
                  endDate={'Jul 15, 2024'}
                  name={'John Doe'}
                  serviceTag={'Plumber'}
                  status={'Active'}
                  milestone={'Milestone Title'}
                  image={fakeImg}
                  statusClass={'bg-[#00CF91] text-white py-1 px-3 rounded flex w-fit mb-1'}
                />
                <ProposalsReceived
                  service={'Painting Services Needed'}
                  startDate={'Jul 15, 2024'}
                  endDate={'Jul 15, 2024'}
                  name={'John Doe'}
                  serviceTag={'Plumber'}
                  status={'Active'}
                  milestone={'Milestone Title'}
                  image={fakeImg}
                  statusClass={'bg-[#00CF91] text-white py-1 px-3 rounded flex w-fit mb-1'}
                />
              </div>
            </div>
          </div>
        </>
        : ''}

      {(dashboardType === 2) ?
        <>
          <section id='navLinksContainer' className='hidden sm_desktop:block mt-4 mb-4 ml-5'>
            <ul className='flex items-start justify-start gap-7 text-[#0D0B01] font-Onest font-semibold text-lg'>
              <li> All </li>
              <li> Active </li>
              <li> Paused </li>
              <li> Completed </li>
            </ul>
          </section>

          <div className="flex align-middle mt-2">
            <div className="input-container_proposal">
              <img src={searchIcon} className='icon_proposal' width='20' height='20' alt="" />
              <input type="text" className="searchbar_proposal" placeholder=" Searching for..." />
            </div>
            <button className="btn-filter-proposal flex items-center px-4 py-2 text-green-500 rounded-md">
              <img src={slidersIcon} alt="Button Image" className="w-6 h-6 mr-2" />
              <span className="hideSpan_Dsh">Filters </span>
            </button>
          </div>

          <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap p-4">
            <span className="font-bold">Sort By:</span>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortbyContact === 'start_date' ? 'text-green-500' : 'text-gray-400'}`} onClick={() => setSortByContact('start_date')}>Start Date</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortbyContact === 'end_date' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortByContact('end_date')}>End Date</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortbyContact === 'hero_name' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortByContact('hero_name')}>Hero Name</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortbyContact === 'contact_name' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortByContact('contact_name')}>Contact Name</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortbyContact === 'desc' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortByContact('desc')}>Descending</button>
            <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortbyContact === 'asc' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => setSortByContact('asc')}>Ascending</button>
          </div>


          <div className="w-full flex gap-x-8 py-4 mb-12">
            <div className="w-full rounded-xl overflow-hidden border-2 hover:bg-white p-6" id="container_wapper">
              <div className="w-4/4 flex">
                <div className="w-2/4" id="container_title">
                  <h2 className='text-2xl font-semibold' >Contracts</h2>
                </div>
              </div>
              <div className="job-listing">
                <Contracts
                  service={'Painting Services Needed'}
                  startDate={'Jul 15, 2024'}
                  endDate={'Jul 15, 2024'}
                  name={'John Doe'}
                  serviceTag={'Plumber'}
                  status={'Active'}
                  milestone={'Milestone Title'}
                  image={fakeImg}
                  statusClass={'bg-[#00CF91] text-white py-1 px-3 rounded flex w-fit mb-1'}
                />
                <Contracts
                  service={'Painting Services Needed'}
                  startDate={'Jul 15, 2024'}
                  endDate={'Jul 15, 2024'}
                  name={'John Doe'}
                  serviceTag={'Plumber'}
                  status={'Active'}
                  milestone={'Milestone Title'}
                  image={fakeImg}
                  statusClass={'bg-[#00CF91] text-white py-1 px-3 rounded flex w-fit mb-1'}
                />
              </div>
            </div>
          </div>
        </>
        : ''}

      {(dashboardType === 3) ? <MyJobs Title={"Cancelled Jobs"} /> : ''}

    </div>
  );
};

export default HeroDashboard;
