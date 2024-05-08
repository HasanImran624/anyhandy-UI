import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../context/ProgressContext";
import { InteriorPaintingJobForm } from "./InteriorPaintingJobForm";
import { ExteriorPaintingJobForm } from "./ExteriorPaintingJobForm";
import { DoorPaintingJobForm } from "./DoorPaintingJobForm";
import { CabinetPaintingJobForm } from "./CabinetPaintingJobForm";
import { FencePaintingJobForm } from "./FencePaintingJobForm";
import { PressureWashingJobForm } from "./PressureWashingJobForm";
import { PaintingJobs, PaintingJobCode } from "../../../Constants";

export const PaintingJobForm = () => {
  const navigate = useNavigate();
  const [selectedSubPaintingJob, setSelectedSubPaintingJob] = useState({});
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
        (s) => s.code === selectedSubPaintingJob.code
      ),
    [formAttributes.subServices, selectedSubPaintingJob.code]
  );

  const addToList = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          code: selectedSubPaintingJob.code,
          name: selectedSubPaintingJob.name,
        },
      ],
    });
    setSelectedSubPaintingJob({});
    setSelectedAttributes({});
  }, [
    formAttributes,
    selectedAttributes,
    selectedSubPaintingJob.code,
    selectedSubPaintingJob.name,
    setFormAttributes,
  ]);

  const handleNext = useCallback(() => {
    if (selectedSubPaintingJob.code) {
      if (!alreadyAdded) {
        addToList();
      }
    }
    updateProgress(progress + 1);
  }, [
    addToList,
    alreadyAdded,
    progress,
    selectedSubPaintingJob.code,
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
    setSelectedSubPaintingJob(e.value);
    setSelectedAttributes({});
  }, []);

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubPaintingJob}
          onChange={onSubJobChange}
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
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.EXTERIOR && (
        <ExteriorPaintingJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.DOOR && (
        <DoorPaintingJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.CABINET && (
        <CabinetPaintingJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.FENCE && (
        <FencePaintingJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubPaintingJob.code === PaintingJobCode.WASHING && (
        <PressureWashingJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}
      {!!selectedSubPaintingJob.code && (
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
