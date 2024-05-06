import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InteriorPaintingJobForm } from "./InteriorPaintingJobForm";
import { ExteriorPaintingJobForm } from "./ExteriorPaintingJobForm";
import { DoorPaintingJobForm } from "./DoorPaintingJobForm";
import { CabinetPaintingJobForm } from "./CabinetPaintingJobForm";
import { FencePaintingJobForm } from "./FencePaintingJobForm";
import { PressureWashingJobForm } from "./PressureWashingJobForm";
import { PaintingJobs, PaintingJobCode } from "../../../Constants";

export const PaintingJobForm = () => {
  const [selectedSubPaintingJob, setSelectedSubPaintingJob] = useState({});

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubPaintingJob}
          onChange={(e) => setSelectedSubPaintingJob(e.value)}
          options={PaintingJobs}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          lect={true}
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubPaintingJob.code === PaintingJobCode.INTERIOR && (
        <InteriorPaintingJobForm
          setSelectedSubPaintingJob={setSelectedSubPaintingJob}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.EXTERIOR && (
        <ExteriorPaintingJobForm
          setSelectedSubPaintingJob={setSelectedSubPaintingJob}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.DOOR && (
        <DoorPaintingJobForm
          setSelectedSubPaintingJob={setSelectedSubPaintingJob}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.CABINET && (
        <CabinetPaintingJobForm
          setSelectedSubPaintingJob={setSelectedSubPaintingJob}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.FENCE && (
        <FencePaintingJobForm
          setSelectedSubPaintingJob={setSelectedSubPaintingJob}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.WASHING && (
        <PressureWashingJobForm
          setSelectedSubPaintingJob={setSelectedSubPaintingJob}
        />
      )}
    </>
  );
};
