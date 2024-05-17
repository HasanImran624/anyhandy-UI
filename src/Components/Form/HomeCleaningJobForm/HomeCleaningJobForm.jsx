import { useState, useCallback, useRef } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../context/ProgressContext";
import { Dropdown } from "primereact/dropdown";
import { HomeCleaningJobs, HomeCleaningJobCode } from "../../../Constants";
import { RegularCleaningJobForm } from "./RegularCleaningJobForm";
import { RegularCleaningJobFormByArea } from "./RegularCleaningJobFormByArea";
import { DeepCleaningJobForm } from "./DeepCleaningJobForm";

export const HomeCleaningJobForm = () => {
  const navigate = useNavigate();
  const [selectedSubHomeCleaningJob, setSelectedSubHomeCleaningJob] = useState(
    {}
  );
  const {
    formAttributes,
    setFormAttributes,
    progress,
    updateProgress,
    resetAttributes,
  } = useProgress();

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [filePreviews, setFilePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [id, setId] = useState(uuid());

  const handleReset = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedAttributes({});
    setFilePreviews([]);
    setId(uuid());
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const fileList = e.target.files;
      const modifiedFilesList = [];
      const previews = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const modifiedFile = new File(
          [file],
          `${selectedSubHomeCleaningJob.code}_${id}_${file.name}`,
          {
            type: file.type,
          }
        );
        modifiedFilesList.push(modifiedFile);

        const reader = new FileReader();
        reader.onload = (event) => {
          previews.push(event.target.result);
          if (previews.length === fileList.length) {
            setFilePreviews(previews);
          }
        };

        reader.readAsDataURL(modifiedFile);
      }

      setSelectedAttributes({
        ...selectedAttributes,
        files: modifiedFilesList,
      });
    },
    [id, selectedAttributes, selectedSubHomeCleaningJob.code]
  );

  const getFileNames = useCallback(() => {
    if (selectedAttributes.files) {
      let names = [];
      for (let i = 0; i < selectedAttributes.files.length; i++) {
        names.push(selectedAttributes.files[i].name.split("_")?.[2]);
      }
      return names.join(", ");
    }
  }, [selectedAttributes.files]);

  const addToList = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          uuid: id,
          code: selectedSubHomeCleaningJob.code,
          name: selectedSubHomeCleaningJob.name,
        },
      ],
    });
    setSelectedSubHomeCleaningJob({});
    handleReset();
    return true;
  }, [
    formAttributes,
    handleReset,
    id,
    selectedAttributes,
    selectedSubHomeCleaningJob.code,
    selectedSubHomeCleaningJob.name,
    setFormAttributes,
  ]);

  const handleNext = useCallback(() => {
    if (selectedSubHomeCleaningJob.code) {
      addToList();
    }
    updateProgress(progress + 1);
  }, [addToList, progress, selectedSubHomeCleaningJob.code, updateProgress]);

  const onSubJobChange = useCallback(
    (e) => {
      setSelectedSubHomeCleaningJob(e.value);
      handleReset();
    },
    [handleReset]
  );

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubHomeCleaningJob}
          onChange={onSubJobChange}
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
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubHomeCleaningJob.code === HomeCleaningJobCode.MAINTAINANCE && (
        <RegularCleaningJobFormByArea
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {selectedSubHomeCleaningJob.code ===
        HomeCleaningJobCode.DEEP_CLEANING && (
        <DeepCleaningJobForm
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}

      {!!selectedSubHomeCleaningJob.code && (
        <>
          <section className="flex flex-col gap-2">
            <h3 className="font-medium text-base text-[#0D0B01]">
              Attachments
            </h3>
            <label className="w-full bg-white rounded-lg p-3 border cursor-pointer">
              Choose file...
              <input
                ref={fileInputRef}
                multiple
                accept="image/*"
                type="file"
                name="attachment"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {selectedAttributes.files && (
              <p className="text-[#636363] text-sm">{getFileNames()}</p>
            )}
            <div className="flex flex-wrap gap-2" id="filePreviews">
              {/* Display file previews here */}
              {filePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ))}
            </div>
          </section>
          <section
            className="flex gap-2 items-center mt-5 cursor-pointer"
            onClick={addToList}
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
