import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { MiscellaneousJobForm } from "./MiscellaneousJobForm";
import { GeneralJobs, GeneralJobCodes } from "../../../Constants";

export const GeneralJobForm = () => {
  const [selectedSubGeneralJob, setSelectedSubGeneralJob] = useState({});

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubGeneralJob}
          onChange={(e) => setSelectedSubGeneralJob(e.value)}
          options={GeneralJobs}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          lect={true}
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubGeneralJob.code === GeneralJobCodes.MISCELLANEOUS && (
        <MiscellaneousJobForm
          setSelectedSubGeneralJob={setSelectedSubGeneralJob}
        />
      )}
    </>
  );
};
