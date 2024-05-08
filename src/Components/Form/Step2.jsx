import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { ProgressAndServiceList } from "./ProgressAndServiceList";
import { PaintingJobForm } from "./PaintingJobForm";
import { PestControlJobbForm } from "./PestControlJobbForm";
import { HomeCleaningJobForm } from "./HomeCleaningJobForm";
import { ApplienceRepairJobForm } from "./ApplienceRepairJobForm";
import { PlumbingJobForm } from "./PlumbingJobForm";
import { HVACJobForm } from "./HVACJobForm";
import { GeneralJobForm } from "./GeneralJobForm";
import { ElectricalJobForm } from "./ElectricalJobForm";
import { CarpentryJobForm } from "./CarpentryJobForm";
import { LandScapeJobForm } from "./LandScapeJobForm";
import { useProgress } from "../../context/ProgressContext";
import { ServiceTypeCode } from "../../Constants";

const Step2 = () => {
  const { progress, updateProgress, formAttributes, resetAttributes } =
    useProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                resetAttributes();
              }}
            >
              <FaArrowLeft color="#00CF91" fontSize="1.5rem" />
              <h3 className="font-Onest font-semibold text-lg text-[#00CF91]">
                Go Back
              </h3>
            </span>
            <header className="flex flex-col gap-5">
              <h2 className="font-bold text-2xl text-[#0D0B01]">
                Add Sub-Services
              </h2>
              <p className="text-[#868580] font-medium text-[20px]">
                This will help a job post stand out
              </p>
            </header>

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.PAINTING && <PaintingJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.HOME_CLEANING && <HomeCleaningJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.PEST_CONTROL && <PestControlJobbForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.APPLIANCE_REPAIR && <ApplienceRepairJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.PLUMBING && <PlumbingJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.HAVAC && <HVACJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.ELECTRICAL && <ElectricalJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.GENERAL && <GeneralJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.CARPENTERY && <CarpentryJobForm />}

            {formAttributes.selectedMainServiceCode ===
              ServiceTypeCode.LANDSCAPING_LAWN && <LandScapeJobForm />}
          </section>
        </section>
      </div>
    </>
  );
};

export default Step2;
