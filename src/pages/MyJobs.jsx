import React, { useState, useEffect } from "react";
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
import MyJobsFilter from "../Components/MyJobsFilter/MyJobsFilter";
import searchIcon from '../Assets/search.png';
import slidersIcon from '../Assets/sliders.png';
import PaginationButtons from "../Components/PaginationButtons";
import axios from "../../src/api/axios";
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


let sortByColumnGlobal = 'startDate';
let sortByTypeGlobal = 'asc';
let activeTabGlobal = '0';
const MyJobs = () => {

    const [sortByColumn, setSortByColumn] = useState('startDate');
    const [sortByType, setSortByType] = useState('asc');

    // const [activeTab, setActiveTab] = useState('All')
    const [recentJobsLst, setRecentJobsLst] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');

    const [jobStartDate, setJobStartDate] = useState('');
    const [jobEndDate, setJobEndDate] = useState('');
    const [dueStartDate, setDueStartDate] = useState('');
    const [dueEndDate, setDueEndDate] = useState('');

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // onPageChange(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const pageNeighbors = 1; // Number of additional page numbers to show on each side of the current page

        for (let i = Math.max(2, currentPage - pageNeighbors); i <= Math.min(totalPages - 1, currentPage + pageNeighbors); i++) {
            pages.push(
                <li key={i}>
                    <button
                        className={`px-3 py-1 border rounded-md ${i === currentPage ? 'border-[#00CF91] text-green-500' : 'border-[#DFE3E8]'
                            }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        if (currentPage > pageNeighbors + 1) {
            pages.unshift(
                <li key={1}>
                    <button
                        className="px-3 py-1 rounded-md border border-[#DFE3E8] text-black"
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </button>
                </li>
            );

            if (currentPage !== pageNeighbors + 2) {
                pages.unshift(
                    <li key="start-ellipsis">
                        <span className="px-3 py-1 rounded-md">...</span>
                    </li>
                );
            }
        }

        if (currentPage < totalPages - pageNeighbors) {
            if (currentPage !== totalPages - pageNeighbors - 1) {
                pages.push(
                    <li key="end-ellipsis">
                        <span className="px-3 py-1 rounded-md">...</span>
                    </li>
                );
            }

            pages.push(
                <li key={totalPages}>
                    <button
                        className="px-3 py-1 rounded-md border border-[#DFE3E8] text-black"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </li>
            );
        }

        return pages;
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        let url = `https://localhost:7046/api/dashboard/GetMyJobsFilterWithUserID?UserID=${userId}&PerPage=${perPage}`;
        axios.get(url).then(response => {
            let data = response.data.data;
            let totalPage = response.data.totalPages;
            let totalRecord = response.data.totalRecord;

            setRecentJobsLst(data);
            setTotalPages(totalPage);

        }).catch(error => {
            console.log('Error', error);
        });
    }, [])

    const handleClear = (e) => {
        e.preventDefault();
        setSearchTxt('');
    };

    const handleSortByClick = (sortByColumn) => {
        debugger;
        // setSortByColumn(sortByColumn);
        sortByColumnGlobal = sortByColumn;
        // setSortByColumn(prevSortByColumn => sortByColumn);
        GetSearchRecord();

    }

    const handleSortByTypeClick = (sortByType) => {
        // setSortByType(sortByType);
        sortByTypeGlobal = sortByType;
        // sortByColumnGlobal = sortByType;
        GetSearchRecord();
    }

    const handleActiveTypeByClick = (activeType) => {
        activeTabGlobal = activeType;
        GetSearchRecord();
    }


    const GetSearchRecord = () => {

        let jobStart_formate = '';
        let endStart_formate = '';
        let dueStart_formate = '';
        let dueEnd_formate = '';

        if (jobStartDate != '') {
            jobStart_formate = Moment(jobStartDate).format('YYYY-MM-DD');
        }
        if (jobEndDate != '') {
            endStart_formate = Moment(jobEndDate).format('YYYY-MM-DD');
        }
        if (dueStartDate) {
            dueStart_formate = Moment(dueStartDate).format('YYYY-MM-DD');
        }
        if (dueEndDate) {
            dueEnd_formate = Moment(dueEndDate).format('YYYY-MM-DD');
        }

        const userId = localStorage.getItem('userId');
        let search = '';
        if (searchTxt === '') {
            search = 'null';
        } else {
            search = searchTxt;
        }
        let url = `https://localhost:7046/api/dashboard/GetSearchFilterWithSortBy?UserID=${userId}&PageNo=${currentPage}&JobStartDate=${jobStart_formate}&JobEndDate=${endStart_formate}&DueStartDate=${dueStart_formate}&DueEndDate=${dueEnd_formate}&SearchTxt=${search}&OrderByType=${sortByTypeGlobal}&SortByColumn=${sortByColumnGlobal}&RecordsPerPage=${perPage}&ActiveType=${activeTabGlobal}`;
        axios.get(url).then(response => {
            debugger;
            let data = response.data.data.results;
            let totalRecord = response.data.totalPages;
            let page = response.data.totalPages;

            console.log(response);

            setRecentJobsLst(data);
            setTotalPages(page);

        }).catch(error => {
            console.log('Error', error);
        });
    }

    return (
        <div className="px-[100px]" id="hero-dashboard-wapper">
            <div className="w-4/4 py-6 hero-dsh-header">
                <div className="w-2/4">
                    <h2 className="text-3xl font-bold mb-3 hero-dsh-headerP">My Jobs</h2>
                    <p className="text-gray-600 hero-dsh-headerP">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="w-2/4 btn-wapper-dsh"></div>
            </div>
            <section id='navLinksContainer' className='hidden sm_desktop:block mt-4 mb-7 ml-5'>
                <ul className='flex items-start justify-start gap-7 text-[#0D0B01] font-Onest font-semibold text-lg'>
                    <li style={ activeTabGlobal === '0'? { borderBottom: '2px solid #00CF91' } : {} } onClick={() => handleActiveTypeByClick('0')} > All </li>
                    <li style={ activeTabGlobal === '1'? { borderBottom: '2px solid #00CF91' } : {} } onClick={() => handleActiveTypeByClick('1')}> Open </li>
                    <li style={ activeTabGlobal === '2'? { borderBottom: '2px solid #00CF91' } : {} } onClick={() => handleActiveTypeByClick('2')}> Closed </li>
                    <li style={ activeTabGlobal === '3'? { borderBottom: '2px solid #00CF91' } : {} } onClick={() => handleActiveTypeByClick('3')}> Cancelled </li>
                    <li style={ activeTabGlobal === '4'? { borderBottom: '2px solid #00CF91' } : {} } onClick={() => handleActiveTypeByClick('4')}> Deleted </li>
                </ul>
            </section>

            <div className="flex align-middle mt-2">
                <div className="input-container_proposal">
                    <img src={searchIcon} className='icon_proposal' width='20' height='20' alt="" />
                    <input type="text" className="searchbar_proposal pl-3" value={searchTxt} placeholder="Searching for..." onChange={(event) => setSearchTxt(event.target.value)} />
                    <button className="pt-[2px] pb-[2px] pr-3 pl-3 border rounded-md border-green-500"
                        onClick={() => GetSearchRecord()}
                    >Search</button>
                </div>
                {searchTxt != '' && (
                    <button onClick={handleClear} className="mr-4 px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">
                        Clear
                    </button>
                )}
                <button className="btn-filter-proposal flex items-center px-4 py-2 text-green-500 rounded-md"
                    onClick={() => setShowModal(true)}>
                    <img src={slidersIcon} alt="Button Image" className="w-6 h-6 mr-2" />
                    <span className="hideSpan_Dsh">Filters </span>
                </button>
            </div>

            <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap p-4">
                <span className="font-bold">Sort By:</span>
                <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortByColumnGlobal === 'startDate' ? 'text-green-500' : 'text-gray-400'}`} onClick={() => handleSortByClick('startDate')}>Start Date</button>
                <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortByColumnGlobal === 'dueDate' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => handleSortByClick('dueDate')}>Due Date</button>
                <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortByColumnGlobal === 'service' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => handleSortByClick('service')}>Service</button>
                <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortByColumnGlobal === 'jobTitle' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => handleSortByClick('jobTitle')}>Job Title</button>
                <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortByTypeGlobal === 'desc' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => handleSortByTypeClick('desc')}>Descending</button>
                <button className={`px-2 py-1 rounded-lg hover:bg-gray-400 ${sortByTypeGlobal === 'asc' ? 'text-green-500' : 'text-gray-400'} `} onClick={() => handleSortByTypeClick('asc')}>Ascending</button>
            </div>

            <div className="w-full gap-x-8 py-4 myJobLst_main_cont">
                <div className="w-full overflow-hidden  hover:bg-white px-4 py-6 t1_hero_main mt-5">
                    {recentJobsLst.map((item, index) => {
                        return (
                            <MyJobsFilter
                                key={index + 1}
                                title={item.jobTitle}
                                createdDate={item.postedDate} // '2 days ago'
                                closedDate={item.dueDate} // 'Feb 19, 2024'
                                ProposalsCount={item.totalPropsals}
                                Status={item.status}
                                MessagesCount={'4'}
                                HiredCount={item.totalHired} />
                        )
                    })}

                    {recentJobsLst.length === 0 &&
                        <>
                            <hr className='my-4' />
                            <div className="w-full py-56">
                                <h1 className="text-center font-bold text-2xl">No Record Found</h1>
                            </div>
                        </>
                    }
                </div>
            </div>

            {recentJobsLst.length != 0 && <div className="p-5">
                <PaginationButtons
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>}


            {/* <nav className="flex justify-between p-6">
                <button
                    className={`px-3 py-1 rounded-md mr-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                <ul className="flex space-x-4">
                    {renderPageNumbers()}

                </ul>
                <button
                    className={`px-3 py-1 rounded-md ml-2 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </nav> */}

            {showModal ? (
                <>
                    <div
                        className=" flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative  flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold sm_mobile:text-2xl lg_mobile:text-2xl sm_tablet:text-2xl md_tablet:text-2xl lg_tablet:text-2xl sm_desktop:text-3xl lg_desktop:text-3xl">
                                        Sort By Date
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}

                                <div className="relative p-6 flex-auto">
                                    <div className="flex justify-center sm_mobile:block lg_mobile:flex  sm_tablet:flex md_tablet:flex lg_tablet:flex sm_desktop:flex lg_desktop:flex">
                                        <div>
                                            <h2>Job Start Date</h2>
                                            <DatePicker
                                                selected={jobStartDate}
                                                onChange={(e) => setJobStartDate(e)}
                                                dateFormat="yyyy-MM-dd"
                                                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="ml-2">
                                            <h2>Job End Date</h2>
                                            <DatePicker
                                                selected={jobEndDate}
                                                onChange={(e) => setJobEndDate(e)}
                                                dateFormat="yyyy-MM-dd"
                                                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex mt-4 justify-center sm_mobile:block lg_mobile:flex  sm_tablet:flex md_tablet:flex lg_tablet:flex sm_desktop:flex lg_desktop:flex">
                                        <div >
                                            <h2>Due Start Date </h2>
                                            <DatePicker
                                                selected={dueStartDate}
                                                onChange={(e) => setDueStartDate(e)}
                                                dateFormat="yyyy-MM-dd"
                                                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="ml-2">
                                            <h2>Due End Date</h2>
                                            <DatePicker
                                                selected={dueEndDate}
                                                onChange={(e) => setDueEndDate(e)}
                                                dateFormat="yyyy-MM-dd"
                                                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { GetSearchRecord(); setShowModal(false) }}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </div>
    );
};

export default MyJobs;
