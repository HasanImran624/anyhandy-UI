import { useState, useCallback, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../../context/ProgressContext";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { LawnCareJobs } from "../../../Constants";

export const LandScapeJobForm = () => {
  const navigate = useNavigate();

  const [selectedSubLandscapeJob, setSelectedSubLandscapeJob] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [filePreviews, setFilePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [id, setId] = useState(uuid());

  const {
    formAttributes,
    setFormAttributes,
    progress,
    updateProgress,
    resetAttributes,
  } = useProgress();

  const handleReset = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedAttributes({});
    setFilePreviews([]);
    setId(uuid());
  }, []);

  const addToList = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          uuid: id,
          code: selectedSubLandscapeJob.code,
          name: selectedSubLandscapeJob.name,
          isNew: !!formAttributes.isEdit ? true : false,
        },
      ],
    });
    setSelectedSubLandscapeJob({});
    handleReset();
    return true;
  }, [
    formAttributes,
    handleReset,
    id,
    selectedAttributes,
    selectedSubLandscapeJob.code,
    selectedSubLandscapeJob.name,
    setFormAttributes,
  ]);

  const handleFileChange = useCallback(
    (e) => {
      const fileList = e.target.files;
      const modifiedFilesList = [];
      const previews = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const modifiedFile = new File(
          [file],
          `${selectedSubLandscapeJob.code}_${id}_${file.name}`,
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
    [id, selectedAttributes, selectedSubLandscapeJob.code]
  );

  const getFileNames = useCallback(() => {
    if (selectedAttributes.files) {
      let names = [];
      for (let i = 0; i < selectedAttributes.files.length; i++) {
        names.push(
          selectedAttributes.files[i].name.split("_")?.slice(2).join("_")
        );
      }
      return names.join(", ");
    }
  }, [selectedAttributes.files]);

  const handleNext = useCallback(() => {
    if (selectedSubLandscapeJob.code) {
      addToList();
    }
    updateProgress(progress + 1);
  }, [addToList, progress, selectedSubLandscapeJob.code, updateProgress]);

  const onSubJobChange = useCallback(
    (e) => {
      setSelectedSubLandscapeJob(e.value);
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
          value={selectedSubLandscapeJob}
          onChange={onSubJobChange}
          options={LawnCareJobs}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          lect={true}
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubLandscapeJob.code && (
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2 font-medium text-base">
            <section className="flex flex-col gap-2">
              <h3 className="font-medium text-base text-[#0D0B01]">
                App. size area
              </h3>
              <input
                type="number"
                name="areaSize"
                value={selectedAttributes.sizeArea}
                onChange={(e) =>
                  setSelectedAttributes({
                    ...selectedAttributes,
                    sizeArea: e.target.value,
                  })
                }
                className="w-full bg-white rounded-lg p-3 border"
                placeholder="Approximate area size e.g., 20"
              />
            </section>
            <section className="flex flex-col gap-2">
              <span className="mt-3">
                <textarea
                  name="specialRequest"
                  id="specialRequest"
                  value={selectedAttributes.specialRequest}
                  onChange={(e) =>
                    setSelectedAttributes({
                      ...selectedAttributes,
                      specialRequest: e.target.value,
                    })
                  }
                  rows="5"
                  className="w-full border border-[#E0E5ED] rounded-xl p-5 outline-none focus:border-[#96A0B5] transition-Colors ease-linear duration-200 placeholder:text-[#96A0B5] resize-none cursor-pointer"
                  placeholder="Please describe any special requests"
                />
              </span>
            </section>
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
          </div>
        </div>
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
