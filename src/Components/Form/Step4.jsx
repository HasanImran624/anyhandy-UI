import { FaArrowLeft } from "react-icons/fa";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import art from "../../Assets/art.png";
import dimension from "../../Assets/dimension.png";
import { CiCalendar } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { BiCabinet } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import {
  MdHomeWork,
  MdFence,
  MdOutlinePlumbing,
  MdElectricBolt,
  MdPestControl,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { TbWashDryP, TbAirConditioning } from "react-icons/tb";
import { GiShears } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";

import axios from "../../api/axios";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../context/ProgressContext";
import {
  SUBMIT_JOB_REQUEST_URL,
  PaintingJobCode,
  PlumbingServiceCode,
  HvacJobCodes,
  CarpentryJobCodes,
  ElectricalJobCodes,
  GeneralJobCodes,
  HomeCleaningJobCode,
  PestControlJobCode,
  LawnCareJobCode,
  ApplianceRepairJobCode,
} from "../../Constants";
import { ProgressAndServiceList } from "./ProgressAndServiceList";

const Step4 = () => {
  const { progress, updateProgress, resetAttributes, formAttributes } =
    useProgress();

  const navigate = useNavigate();
  const submitJob = useCallback(() => {
    try {
      const token = localStorage.getItem("jwt");
      const formData = new FormData();
      const subServices = [];
      let j = 0;
      formAttributes.subServices.forEach((service) => {
        const { files, ...ser } = service;
        if (files) {
          for (let i = 0; i < service.files.length; i++) {
            formData.append(`file${j}`, service.files[i]);
            j++;
          }
        }
        subServices.push(ser);
      });

      const requestFormAttributes = {
        ...formAttributes,
        subServices: subServices,
      };
      formData.append("form_attributes", JSON.stringify(requestFormAttributes));

      axios.post(SUBMIT_JOB_REQUEST_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });
      navigate("/jobPosting");
    } catch (error) {
      console.log(error);
    }
  }, [formAttributes, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useMemo(() => {
    let locationTextArray = [];

    if (formAttributes.location.details) {
      locationTextArray.push(formAttributes.location.details.split(",")[0]);
    } else if (formAttributes.location.area) {
      locationTextArray.push(formAttributes.location.area);
    }

    if (formAttributes.location.city) {
      locationTextArray.push(formAttributes.location.city);
    }

    return locationTextArray.join(", ");
  }, [
    formAttributes.location.area,
    formAttributes.location.city,
    formAttributes.location.details,
  ]);

  const getNumberItem = useCallback((service) => {
    let numberItem = "";
    let area = "";
    let color = "";
    let icon = "";
    let showPaint = true;
    let showArea = true;
    switch (service.code) {
      case PaintingJobCode.CABINET:
        numberItem = service.numberItems + " cabinet";
        showArea = false;
        color = service.paintColor;
        if (service.providePaint) {
          color = "Paint Provided";
        }
        icon = <BiCabinet size={25} />;
        break;
      case PaintingJobCode.DOOR:
        numberItem = service.numberItems + " door";
        showArea = false;
        color = service.paintColor;
        if (service.providePaint) {
          color = "Paint Provided";
        }
        icon = <BsDoorOpen size={25} />;
        break;
      case PaintingJobCode.EXTERIOR:
        numberItem = "Exterior";
        area = service.sizeArea + " Sq. Ft.";
        color = service.paintColor;
        if (service.providePaint) {
          color = "Paint Provided";
        }
        icon = <MdHomeWork size={25} />;
        break;
      case PaintingJobCode.FENCE:
        numberItem = "Fence";
        area = service.sizeArea + " Sq. Ft.";
        color = service.paintColor;
        if (service.providePaint) {
          color = "Paint Provided";
        }
        icon = <MdFence size={25} />;
        break;
      case PaintingJobCode.INTERIOR:
        numberItem = service.numberItems + " interior";
        area = service.sizeArea + " Sq. Ft.";
        color = service.paintColor;
        if (service.providePaint) {
          color = "Paint Provided";
        }
        icon = <MdOutlineBedroomParent size={25} />;
        break;
      case PaintingJobCode.WASHING:
        numberItem = "Washing";
        area = service.sizeArea + " Sq. Ft.";
        icon = <TbWashDryP size={25} />;
        break;
      case PlumbingServiceCode.DRAINS:
      case PlumbingServiceCode.LEAKED:
      case PlumbingServiceCode.OTHERS:
      case PlumbingServiceCode.REPAIRING:
        numberItem = service.numberItems;
        showArea = false;
        icon = <MdOutlinePlumbing size={25} />;
        showPaint = false;
        break;
      case HvacJobCodes.CLEANING_SERVICE:
      case HvacJobCodes.REGULAR_MAINTAINANCE:
      case HvacJobCodes.REPAIRING_REPLACE:
        numberItem = service.numberItems;
        showArea = false;
        icon = <TbAirConditioning size={25} />;
        showPaint = false;
        break;
      case CarpentryJobCodes.CABINET_REPAIR:
      case CarpentryJobCodes.CUSTOM:
      case CarpentryJobCodes.DOOR_REPAIR:
      case CarpentryJobCodes.FURNITURE_ASSEMBLY:
      case CarpentryJobCodes.OTHERS:
      case CarpentryJobCodes.REPAIRING_REPLACE:
      case CarpentryJobCodes.WINDOW_REPAIR:
        numberItem = service.numberItems;
        showArea = false;
        icon = <MdOutlineBedroomParent size={25} />;
        showPaint = false;
        break;
      case ElectricalJobCodes.ELECTRICAL_TROUBLESHOOT:
      case ElectricalJobCodes.GENERAL:
      case ElectricalJobCodes.LIGHT_FAN:
      case ElectricalJobCodes.NEW_CONSTRUCTION:
      case ElectricalJobCodes.OTHERS:
      case ElectricalJobCodes.TV_HOME_THETER:
      case ElectricalJobCodes.UPGRADE_PANEL:
        numberItem = service.numberItems;
        showArea = false;
        icon = <MdElectricBolt size={25} />;
        showPaint = false;
        break;
      case GeneralJobCodes.MISCELLANEOUS:
        return;
      case PestControlJobCode.ANT:
      case PestControlJobCode.BUG:
      case PestControlJobCode.FLIES:
      case PestControlJobCode.RODENT:
      case PestControlJobCode.COCKROACH:
        numberItem = service.numberItems + " room";
        icon = <MdPestControl size={25} />;
        area = service.locationType;
        showPaint = false;
        break;
      case LawnCareJobCode.IRRIGATION:
      case LawnCareJobCode.MOVING:
      case LawnCareJobCode.TRIMMING:
        numberItem = service.numberItems;
        area = service.sizeArea + " Sq. Ft.";
        icon = <GiShears size={25} />;
        showPaint = false;
        break;
      case ApplianceRepairJobCode.FIXING:
        numberItem = service.numberItems;
        showArea = false;
        icon = <RiFridgeFill size={25} />;
        showPaint = false;
        break;
      case HomeCleaningJobCode.REGULAR:
        numberItem = service.numberHours + " hour";
        area = service.numberCleaner ? service.numberCleaner + " cleaner" : "";
        icon = <MdHomeWork size={25} />;
        showPaint = false;
        break;
      case HomeCleaningJobCode.MAINTAINANCE:
        numberItem = service.numberHours + " hour";
        area = service.areaType;
        icon = <MdHomeWork size={25} />;
        showPaint = false;
        break;
      case HomeCleaningJobCode.DEEP_CLEANING:
        numberItem = service.numberItems + " item";
        area = service.itemSize + " Sq. Ft.";
        icon = <MdHomeWork size={25} />;
        showPaint = false;
        break;
      default:
        return <div></div>;
    }
    return (
      <div className="flex-1 bg-white flex gap-x-10 gap-y-5 items-center flex-wrap py-3 px-5 rounded-b-lg">
        <span className="flex items-center gap-2">
          {icon}
          <h6>{numberItem}</h6>
        </span>
        {showArea && (
          <span className="flex items-center gap-2">
            <img src={dimension} alt="bed" className="pointer-events-none" />
            <h6>{area}</h6>
          </span>
        )}
        {showPaint && (
          <span className="flex items-center gap-2">
            <img src={art} alt="art" className="pointer-events-none" />
            {!!service.providePaint ? (
              <h6>{color}</h6>
            ) : (
              <span
                className="w-7 h-7 rounded-full"
                style={{
                  background: color || "#FFFFF0",
                }}
              />
            )}
          </span>
        )}
      </div>
    );
  }, []);

  const subServices = useMemo(() => {
    return formAttributes.subServices.map((service) => {
      return (
        <div
          key={service.name}
          className="flex flex-col border border-[#E3E3E3] rounded-lg"
        >
          <h4 className="flex-1 bg-green-50 py-3 px-5 rounded-t-lg border-b border-[#E3E3E3] font-medium text-base text-black">
            {service.name}
          </h4>
          {getNumberItem(service)}
        </div>
      );
    });
  }, [formAttributes.subServices, getNumberItem]);

  return (
    <>
      <div className="flex flex-col gap-10 px-5 py-10 sm_desktop:py-0">
        <section className="w-full h-full flex flex-col sm_desktop:gap-[10%] gap-10 sm_desktop:flex-row">
          <ProgressAndServiceList />
          <section className="w-full sm_desktop:w-[45%] h-full flex flex-col gap-7">
            <span
              className="flex gap-3 w-fit cursor-pointer"
              onClick={() => {
                updateProgress(progress - 1);
              }}
            >
              <FaArrowLeft color="#00CF91" fontSize="1.5rem" />
              <h3 className="font-Onest font-semibold text-lg text-[#00CF91]">
                Go Back
              </h3>
            </span>
            <header className="flex flex-col gap-5">
              <h2 className="font-bold text-2xl text-[#0D0B01]">
                {formAttributes.mainServiceName}
              </h2>
              <p className="text-black font-medium text-base">
                {formAttributes.mainServiceDescription}
              </p>
              <hr />
            </header>
            <section className="flex flex-col gap-5">
              <h2 className="font-bold text-2xl text-[#0D0B01]">
                Sub Services
              </h2>
              {subServices}
              <span
                onClick={() => {
                  updateProgress(2);
                }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
                <h6 className="font-semibold text-base text-[#00CF91]">
                  Add Sub-Service
                </h6>
              </span>
              <hr />
              <div className="flex flex-col justify-center items-start gap-5">
                <h4 className="font-bold text-2xl text-black">Job Details</h4>
                <div className="flex flex-col justify-center items-start gap-5">
                  <span className="flex items-center">
                    <div className="flex items-center gap-2 w-44">
                      {" "}
                      <CiCalendar size={25} /> Date
                    </div>
                    <div className="font-medium text-base">
                      {formAttributes.jobDetails?.startImmediatly
                        ? "Start Immediate"
                        : formAttributes.jobDetails?.startDate &&
                          formAttributes.jobDetails?.endDate
                        ? `${formAttributes.jobDetails?.startDate.format(
                            "DD/MM/YYYY"
                          )} to ${formAttributes.jobDetails?.endDate?.format(
                            "DD/MM/YYYY"
                          )}`
                        : ""}
                    </div>
                  </span>
                  <span className="flex items-center">
                    <div className="flex items-center gap-2 w-44">
                      {" "}
                      <CiMoneyBill size={25} /> Budget
                    </div>
                    <div className="font-medium text-base">
                      {!!formAttributes.jobDetails.isHourlyRate
                        ? `$${formAttributes.jobDetails.startRate || 0}/hr-$${
                            formAttributes.jobDetails.endRate || 0
                          }/hr`
                        : `$${formAttributes.jobDetails.fixedPriceAmount || 0}`}
                    </div>
                  </span>
                  <span className="flex items-center">
                    <div className="flex items-center gap-2 w-44">
                      <CiLocationOn size={25} /> Location
                    </div>
                    <div className="font-medium text-base">{location}</div>
                  </span>
                </div>
              </div>
            </section>
          </section>
        </section>
        <span className="w-full flex items-center justify-between">
          <button
            onClick={() => {
              resetAttributes();
              updateProgress(1);
              navigate("/");
            }}
            className="font-semibold text-lg text-black p-4 rounded-md border borer-[#E1DFD7] hover:text-white hover:bg-red-600 outline-none focus:border-red-500 transition-colors ease-out duration-200"
          >
            Cancel
          </button>
          <span className="flex items-center gap-5">
            <button
              onClick={() => {
                updateProgress(progress - 1);
              }}
              className="font-semibold text-lg bg-white text-[#00CF91] p-4 rounded-md border borer-[#E1DFD7] hover:bg-green-50 outline-none focus:bg-green-100 transition-colors ease-et duration-200"
            >
              Edit Details
            </button>
            <button
              onClick={submitJob}
              className="font-semibold text-lg text-white bg-[#00CF91] rounded-md p-4 border borer-[#E1DFD7] hover:bg-[#1DA87E] outline-none focus:border-[#1DA87E] transition-colors ease-in duration-100"
            >
              Confirm And Post
            </button>
          </span>
        </span>
      </div>
    </>
  );
};

export default Step4;
