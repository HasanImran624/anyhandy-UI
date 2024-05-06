import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { PestControlJobs, PestControlJobCode } from "../../../Constants";
import { AntControlJobForm } from "./AntControlJobForm";
import { FliesControlJobForm } from "./FliesControlJobForm";
import { BugConTrolJobForm } from "./BugConTrolJobForm";
import { CockroachControlJobForm } from "./CockroachControlJobForm";
import { RodentControlJobForm } from "./RodentControlJobForm";

export const PestControlJobbForm = () => {
  const [selectedSubPestControlJob, setSelectedSubPestControlJob] = useState(
    {}
  );

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubPestControlJob}
          onChange={(e) => setSelectedSubPestControlJob(e.value)}
          options={PestControlJobs}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          lect={true}
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubPestControlJob.code === PestControlJobCode.ANT && (
        <AntControlJobForm
          setSelectedSubPestControlJob={setSelectedSubPestControlJob}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.COCKROACH && (
        <CockroachControlJobForm
          setSelectedSubPestControlJob={setSelectedSubPestControlJob}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.FLIES && (
        <FliesControlJobForm
          setSelectedSubPestControlJob={setSelectedSubPestControlJob}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.BUG && (
        <BugConTrolJobForm
          setSelectedSubPestControlJob={setSelectedSubPestControlJob}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.RODENT && (
        <RodentControlJobForm
          setSelectedSubPestControlJob={setSelectedSubPestControlJob}
        />
      )}
    </>
  );
};
