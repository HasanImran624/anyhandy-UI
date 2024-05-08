import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { Dropdown } from "primereact/dropdown";
import { MiscellaneousJobForm } from "./MiscellaneousJobForm";
import { GeneralJobs, GeneralJobCodes } from "../../../Constants";
import { useProgress } from "../../../context/ProgressContext";

export const GeneralJobForm = () => {
  const navigate = useNavigate();
  const [selectedSubGeneralJob, setSelectedSubGeneralJob] = useState({});
  const {
    formAttributes,
    setFormAttributes,
    progress,
    updateProgress,
    resetAttributes,
  } = useProgress();

  const [errorText, setErrorText] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const handleFileChange = useCallback(
    (e) => {
      setSelectedAttributes({ ...selectedAttributes, files: e.target.files });
    },
    [selectedAttributes]
  );

  const getFileNames = useCallback(() => {
    if (selectedAttributes.files) {
      let names = [];
      for (let i = 0; i < selectedAttributes.files.length; i++) {
        names.push(selectedAttributes.files[i].name);
      }
      return names.join(", ");
    }
  }, [selectedAttributes.files]);

  const alreadyAdded = useMemo(
    () =>
      !!formAttributes.subServices.find(
        (s) => s.code === selectedSubGeneralJob.code
      ),
    [formAttributes.subServices, selectedSubGeneralJob.code]
  );

  const addToList = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          code: selectedSubGeneralJob.code,
          name: selectedSubGeneralJob.name,
        },
      ],
    });
    setSelectedSubGeneralJob({});
    setSelectedAttributes({});
    return true;
  }, [
    formAttributes,
    selectedAttributes,
    selectedSubGeneralJob.code,
    selectedSubGeneralJob.name,
    setFormAttributes,
  ]);

  const add = useCallback(() => {
    if (alreadyAdded) {
      setErrorText("* Service is already added");
      return;
    }
    addToList();
  }, [addToList, alreadyAdded]);

  const handleNext = useCallback(() => {
    if (selectedSubGeneralJob.code) {
      if (!alreadyAdded) {
        addToList();
      }
    }
    updateProgress(progress + 1);
  }, [addToList, alreadyAdded, progress, selectedSubGeneralJob.code, updateProgress]);

  const onSubJobChange = useCallback((e) => {
    setSelectedSubGeneralJob(e.value);
    setSelectedAttributes({});
  }, []);

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubGeneralJob}
          onChange={onSubJobChange}
          options={GeneralJobs}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubGeneralJob.code === GeneralJobCodes.MISCELLANEOUS && (
        <MiscellaneousJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {!!selectedSubGeneralJob.code && (
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
          <section className="flex flex-col gap-2">
            <h3 className="font-medium text-base text-[#0D0B01]">
              Attachments
            </h3>
            <label className="w-full bg-white rounded-lg p-3 border cursor-pointer">
              Choose file...
              <input
                multiple
                type="file"
                name="attachment"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {selectedAttributes.files && (
              <p className="text-[#636363] text-sm">{getFileNames()}</p>
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
