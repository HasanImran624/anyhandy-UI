import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { HomeCleaningJobs, HomeCleaningJobCode } from "../../../Constants";
import { RegularCleaningJobForm } from "./RegularCleaningJobForm";
import { RegularCleaningJobFormByArea } from "./RegularCleaningJobFormByArea";
import { DeepCleaningJobForm } from "./DeepCleaningJobForm";

export const HomeCleaningJobForm = () => {
  const [selectedSubHomeCleaningJob, setSelectedSubHomeCleaningJob] = useState(
    {}
  );

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubHomeCleaningJob}
          onChange={(e) => setSelectedSubHomeCleaningJob(e.value)}
          options={HomeCleaningJobs}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          lect={true}
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubHomeCleaningJob.code === HomeCleaningJobCode.REGULAR && (
        <RegularCleaningJobForm
          setSelectedSubHomeCleaningJob={setSelectedSubHomeCleaningJob}
        />
      )}

      {selectedSubHomeCleaningJob.code === HomeCleaningJobCode.MAINTAINANCE && (
        <RegularCleaningJobFormByArea
          setSelectedSubHomeCleaningJob={setSelectedSubHomeCleaningJob}
        />
      )}

      {selectedSubHomeCleaningJob.code ===
        HomeCleaningJobCode.DEEP_CLEANING && (
        <DeepCleaningJobForm
          setSelectedSubHomeCleaningJob={setSelectedSubHomeCleaningJob}
        />
      )}
    </>
  );
};
