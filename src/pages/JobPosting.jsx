import { Footer } from "../Components/Footer/Footer";
import { Navbar } from "../Components/Navbar/Navbar";
import { useCallback, useMemo, useEffect, useState } from "react";
import arrow from "../Assets/arrow.png";
import art from "../Assets/art.png";
import dimension from "../Assets/dimension.png";
import { CiCalendar } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useProgress } from "../context/ProgressContext";
import { useNavigate } from "react-router-dom";
import { arrayChunk } from "../utils";
import {
  MdHomeWork,
  MdFence,
  MdOutlinePlumbing,
  MdElectricBolt,
  MdPestControl,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { BiCabinet } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { TbWashDryP, TbAirConditioning } from "react-icons/tb";
import { GiShears } from "react-icons/gi";
import { RiFridgeFill } from "react-icons/ri";
import {
  services,
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
} from "../Constants";

const JobPosting = () => {
  const navigate = useNavigate();
  const { updateProgress, formAttributes, setFormAttributes } = useProgress();

  const getService = useCallback(
    (code) => services.find((ser) => ser.code === code),
    []
  );

  const [filePreviews, setFilePreviews] = useState({});

  useEffect(() => {
    formAttributes.subServices.forEach((service) => {
      const previews = [];
      service.files?.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          previews.push(event.target.result);
          if (previews.length === service.files.length) {
            setFilePreviews((prevState) => ({
              ...prevState,
              [service.uuid]: previews,
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    });
  }, [formAttributes.subServices]);

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

  const listSubServices = useMemo(() => {
    const chunk = arrayChunk(formAttributes.subServices);
    return chunk.map((ch) => {
      return (
        <span key={`main${ch}`} className="flex gap-5 flex-wrap">
          {ch.map((service) => {
            return (
              <div
                key={service.name}
                className="flex flex-col border border-[#E3E3E3] rounded-lg"
              >
                <h4 className="flex-1 bg-green-50 py-3 px-5 rounded-t-lg border-b border-[#E3E3E3] font-medium text-base text-black">
                  {service.name}
                </h4>
                {getNumberItem(service)}
                <span className="flex items-center gap-2 pl-2">
                  <p>{service.specialRequest}</p>
                </span>
                <span className="flex items-center gap-2">
                  {filePreviews[service.uuid]?.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                </span>
              </div>
            );
          })}
        </span>
      );
    });
  }, [filePreviews, formAttributes.subServices, getNumberItem]);

  const locaion = useMemo(() => {
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

  const onEditClick = useCallback(() => {
    updateProgress(1);
    setFormAttributes({ ...formAttributes, isEdit: true });
    navigate("/services");
  }, [formAttributes, navigate, setFormAttributes, updateProgress]);

  return (
    <>
      <Navbar />
      <div
        className="w-full h-full py-5 px-[5%] bg-opacity-90"
        style={{
          background:
            "linear-gradient(0deg, rgba(135,206,250,0.2) 3%, rgba(135,206,250,0.1) 21%, rgba(255,255,255,1) 86%)",
        }}
      >
        <section className="w-full h-full sm_desktop:p-20 flex flex-col gap-10 bg-white border border-[#E1DFD7] rounded-[50px]">
          <section className="flex items-center justify-center">
            <div className="flex-1 text-center bg-[#00CF91] text-white py-3 font-medium text-sm border border-[#00CF91]">
              View Job Posting
            </div>
            <img src={arrow} alt="arrow" className="pointer-events-none h-5" />
            <div className="flex-1 text-[#0d0d0d] text-center bg-white py-3 font-medium text-sm border border-[#E1DFD7]">
              Invite handyman
            </div>
            <img src={arrow} alt="arrow" className="pointer-events-none h-5" />
            <div className="flex-1 text-[#0d0d0d] text-center bg-white py-3 font-medium text-sm border border-[#E1DFD7]">
              Review Proposals
            </div>
            <img src={arrow} alt="arrow" className="pointer-events-none h-5" />
            <div className="flex-1 text-[#0d0d0d] text-center bg-white py-3 font-medium text-sm border border-[#E1DFD7]">
              Hire
            </div>
          </section>
          <section className="w-full h-full flex">
            <section className="w-[80%] flex flex-col gap-5">
              <header className="flex flex-col gap-5 pr-[5%]">
                <h2 className="font-bold text-2xl text-[#0D0B01]">
                  {getService(formAttributes.selectedMainServiceCode)?.name}
                </h2>
                <p className="text-black font-medium text-base">
                  {formAttributes.mainServiceDescription}
                </p>
                <hr />
              </header>
              <h2 className="font-bold text-2xl text-[#0D0B01]">
                Sub Services
              </h2>
              {listSubServices}
              <div className="flex flex-col justify-center items-start gap-5">
                <h4 className="font-bold text-2xl text-black">Job Details</h4>
                <div className="flex items-start gap-20">
                  <span className="flex flex-col gap-1 justify-center">
                    <div className="flex items-center gap-2">
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
                  <span className="flex flex-col gap-1 justify-center">
                    <div className="flex items-center gap-2">
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
                  <span className="flex flex-col gap-1 justify-center">
                    <div className="flex items-center gap-2">
                      <CiLocationOn size={25} /> Location
                    </div>
                    <div className="font-medium text-base">{locaion}</div>
                  </span>
                </div>
              </div>
            </section>
            <section className="w-[5%] flex items-center justify-center">
              <div className="w-1 h-full bg-transparent border-r border-[#E3E3E3]"></div>{" "}
            </section>
            <section className="w-[15%] flex flex-col gap-3">
              <span className="flex items-center gap-2 text-[#00CF91] cursor-pointer w-fit pb-1 border-b-2 border-transparent transition ease-in-out duration-200 hover:border-[#E3E3E3] ">
                <DeleteIcon />
                Delete
              </span>
              <span
                className="flex items-center gap-2 text-[#00CF91] cursor-pointer w-fit pb-1 border-b-2 border-transparent transition ease-in-out duration-200 hover:border-[#E3E3E3]"
                onClick={onEditClick}
              >
                <EditIcon />
                Edit Details
              </span>
              <span
                onClick={() => navigate("/jobPosting/inviteHandyman")}
                className="flex items-center gap-2 text-[#00CF91] cursor-pointer w-fit pb-1 border-b-2 border-transparent transition ease-in-out duration-200 hover:border-[#E3E3E3] "
              >
                <ArrowForwardIosIcon color="primary" />
                Invite Handyman
              </span>
            </section>
          </section>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default JobPosting;
