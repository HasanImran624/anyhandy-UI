import { useCallback, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Tooltip } from "primereact/tooltip";
import { services } from "../../Constants";
import { useNavigate } from "react-router-dom";

import { useProgress } from "../../context/ProgressContext";
import ProgressBar from "../ProgressBar/ProgressBar";

const Step1 = () => {
  const navigate = useNavigate();
  const {
    progress,
    updateProgress,
    formAttributes,
    setFormAttributes,
    resetAttributes,
  } = useProgress();
  const onChangeMainService = useCallback(
    (service) => {
      if (!!formAttributes.isEdit) {
        return;
      }

      setFormAttributes({
        ...formAttributes,
        selectedMainServiceCode: service.code,
        mainServiceName: service.name,
      });
    },
    [formAttributes, setFormAttributes]
  );

  const showTooltip = useCallback(
    (service) => {
      if (!formAttributes.isEdit) {
        return true;
      }

      if (
        !!formAttributes.isEdit &&
        service.code === formAttributes.selectedMainServiceCode
      ) {
        return true;
      }
      return false;
    },
    [formAttributes.isEdit, formAttributes.selectedMainServiceCode]
  );

  return (
    <div className="flex flex-col gap-10 px-5 py-10 sm_desktop:py-0">
      <section className="w-full h-full flex flex-col sm_desktop:gap-[10%] gap-10 sm_desktop:flex-row">
        <section className="w-full sm_desktop:w-[45%] flex flex-col gap-10 sm_desktop:flex-row">
          <div>
            <ProgressBar progress={progress} />
          </div>
          <div className="hidden sm_desktop:flex flex-col gap-5">
            <h2 className="font-Onest font-bold text-4xl leading-snug text-[#0D0B01]">
              Lets help you find handymen for your needs
            </h2>
            <p className="font-Onest font-medium text-lg text-[#868580] pr-[20%]">
              Select main service of job that needs to be done
            </p>
          </div>
        </section>
        <section className="w-full sm_desktop:w-[45%] h-full flex flex-col gap-7">
          <span
            className="flex gap-3 w-fit cursor-pointer"
            onClick={() => {
              resetAttributes();
              navigate("/");
            }}
          >
            <FaArrowLeft color="#00CF91" fontSize="1.5rem" />
            <h3 className="font-Onest font-semibold text-lg text-[#00CF91]">
              Go Back
            </h3>
          </span>
          <section className="h-full flex flex-col gap-7">
            <h2 className="font-bold text-2xl text-[#0D0B01]">
              Select Main Services
            </h2>
            <p className="text-[#868580] font-medium text-[20px]">
              Select main service of job that needs to be done
            </p>
            <section className="w-full flex flex-col gap-3 flex-wrap justify-center sm_desktop:justify-start">
              <section className="flex gap-5 flex-wrap justify-center sm_desktop:justify-start">
                {services.map((service) => (
                  <section key={service.id}>
                    <div
                      key={service.id}
                      name={service.uid}
                      onClick={() => onChangeMainService(service)}
                      className={`w-fit flex items-center justify-center gap-3 rounded-[50px] p-2 lg_mobile:p-3 border border-[#E1DFD7] cursor-pointer ${
                        !!formAttributes.isEdit ? "" : "hover:bg-green-300"
                      }  ${
                        formAttributes.selectedMainServiceCode === service.code
                          ? "bg-[#00CF91] text-white"
                          : "bg-white"
                      } transition-colors ease-in-out duration-200 form-services-btn`}
                    >
                      <p className="font-medium text-center text-[0.7rem] lg_mobile:text-base xl_mobile:text-xs">
                        {service.name}
                      </p>
                      <IoMdInformationCircleOutline
                        color={
                          formAttributes.selectedMainServiceCode ===
                          service.code
                            ? "#FFFF"
                            : "#AFAFAF"
                        }
                        className="text-lg lg_mobile:text-3xl"
                      />
                    </div>

                    {showTooltip(service) && (
                      <Tooltip
                        target={`[name="${service.uid}"]`}
                        className="bg-white min-w-52 border border-slate-200 rounded-md tooltip-shadow mt-2 text-base font-medium"
                        autoHide={false}
                        position={"bottom"}
                        showDelay={100}
                        hideDelay={100}
                      >
                        {service.subServices?.map((subService, index) => (
                          <div key={index} className="shadow-2xl">
                            <p
                              data-pr-tooltip="sub-service"
                              className="w-full bg-white hover:bg-green-100 transition ease-out duration-100 p-3"
                            >
                              {subService.name}
                            </p>
                          </div>
                        ))}
                      </Tooltip>
                    )}
                  </section>
                ))}
              </section>
            </section>
            <section className="flex flex-col gap-3 items-start ">
              <h3 className="font-normal text-lg text-[#0D0B01]">Notes</h3>
              <ul className="list-disc ml-5 font-light text-lg text-[#636363] flex flex-col">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Impedit?
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. qui
                  mollitia ex aliquam quod aut! Impedit?
                </li>
              </ul>
            </section>
            <section className="flex flex-col gap-3">
              <h3 className="font-medium text-lg text-[#0D0B01]">
                Enter job description
              </h3>
              <span>
                <textarea
                  name="service_des"
                  rows="5"
                  className="w-full border border-[#E0E5ED] rounded-xl p-5 outline-none focus:border-[#96A0B5] transition-colors ease-linear duration-200 placeholder:text-[#96A0B5] resize cursor-pointer"
                  placeholder="Please describe a job that needs to be done"
                  value={formAttributes.mainServiceDescription}
                  onInput={(e) =>
                    setFormAttributes({
                      ...formAttributes,
                      mainServiceDescription: e.target.value,
                    })
                  }
                />
              </span>
            </section>
            <span className="w-full flex items-center justify-end gap-5">
              <button
                onClick={() => {
                  resetAttributes();
                  navigate("/");
                }}
                className="font-semibold text-lg text-black p-4 rounded-md border borer-[#E1DFD7] hover:bg-red-600 outline-none focus:border-red-500 transition-colors ease-out duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => updateProgress(progress + 1)}
                className="font-semibold text-lg text-white bg-[#00CF91] rounded-md p-4 border borer-[#E1DFD7]
                            hover:bg-[#1DA87E] outline-none focus:border-[#1DA87E] transition-colors ease-in duration-100
                            disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formAttributes.selectedMainServiceCode === null}
              >
                Continue
              </button>
            </span>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Step1;
