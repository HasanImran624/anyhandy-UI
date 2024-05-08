import { useState, useCallback, useMemo } from "react";
import { Dropdown } from "primereact/dropdown";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../../context/ProgressContext";
import { PestControlJobs, PestControlJobCode } from "../../../Constants";
import { AntControlJobForm } from "./AntControlJobForm";
import { FliesControlJobForm } from "./FliesControlJobForm";
import { BugConTrolJobForm } from "./BugConTrolJobForm";
import { CockroachControlJobForm } from "./CockroachControlJobForm";
import { RodentControlJobForm } from "./RodentControlJobForm";

export const PestControlJobbForm = () => {
  const navigate = useNavigate();
  const [selectedSubPestControlJob, setSelectedSubPestControlJob] = useState(
    {}
  );
  const {
    formAttributes,
    setFormAttributes,
    progress,
    updateProgress,
    resetAttributes,
  } = useProgress();

  const [errorText, setErrorText] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const alreadyAdded = useMemo(
    () =>
      !!formAttributes.subServices.find(
        (s) => s.code === selectedSubPestControlJob.code
      ),
    [formAttributes.subServices, selectedSubPestControlJob.code]
  );

  const addToList = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          code: selectedSubPestControlJob.code,
          name: selectedSubPestControlJob.name,
        },
      ],
    });
    setSelectedSubPestControlJob({});
    setSelectedAttributes({});
    return true;
  }, [
    formAttributes,
    selectedAttributes,
    selectedSubPestControlJob.code,
    selectedSubPestControlJob.name,
    setFormAttributes,
  ]);

  const handleNext = useCallback(() => {
    if (selectedSubPestControlJob.code) {
      if (!alreadyAdded) {
        addToList();
      }
    }
    updateProgress(progress + 1);
  }, [
    addToList,
    alreadyAdded,
    progress,
    selectedSubPestControlJob.code,
    updateProgress,
  ]);

  const add = useCallback(() => {
    if (alreadyAdded) {
      setErrorText("* Service is already added");
      return;
    }
    addToList();
  }, [addToList, alreadyAdded]);

  const onSubJobChange = useCallback((e) => {
    setSelectedSubPestControlJob(e.value);
    setSelectedAttributes({});
  }, []);

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubPestControlJob}
          onChange={onSubJobChange}
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
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.COCKROACH && (
        <CockroachControlJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.FLIES && (
        <FliesControlJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.BUG && (
        <BugConTrolJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPestControlJob.code === PestControlJobCode.RODENT && (
        <RodentControlJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {!!selectedSubPestControlJob.code && (
        <>
          <section className="flex flex-col gap-2">
            {!!errorText && (
              <span
                style={{ color: "#dc2626" }}
                className="font-semibold text-base"
              >
                {errorText}
              </span>
            )}
          </section>
          <section
            className="flex gap-2 items-center mt-5 cursor-pointer"
            onClick={add}
          >
            <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
            <h4 className="font-semibold text-base">Add To the list</h4>
          </section>
        </>
      )}

      <span className="w-full flex items-center justify-end gap-5">
        <button
          onClick={() => {
            resetAttributes();
            navigate("/");
            updateProgress(1);
          }}
          className="font-semibold text-lg text-black p-4 rounded-md border borer-[#E1DFD7] hover:bg-red-600 outline-none focus:border-red-500 transition-Colors ease-out duration-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="font-semibold text-lg text-white bg-[#00CF91] rounded-md p-4 border borer-[#E1DFD7] hover:bg-[#1DA87E] outline-none focus:border-[#1DA87E] transition-Colors ease-in duration-100"
        >
          Continue
        </button>
      </span>
    </>
  );
};
