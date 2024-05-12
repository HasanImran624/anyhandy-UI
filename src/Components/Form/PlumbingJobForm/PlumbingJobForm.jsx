import { useState, useCallback, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../context/ProgressContext";
import { PLumbingServices, Rooms } from "../../../Constants";

export const PlumbingJobForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedSubPlumbingJob, setSelectedSubPlumbingJob] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [filePreviews, setFilePreviews] = useState([]);

  const {
    formAttributes,
    setFormAttributes,
    progress,
    updateProgress,
    resetAttributes,
  } = useProgress();

  const id = uuid().substring(0, 4);
  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Resetting the value of the file input
    }
  };

  const addToList = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          uuid: id,
          code: selectedSubPlumbingJob.code,
          name: selectedSubPlumbingJob.name,
        },
      ],
    });
    setSelectedSubPlumbingJob({});
    setSelectedAttributes({});
    handleReset();
  }, [
    formAttributes,
    id,
    selectedAttributes,
    selectedSubPlumbingJob.code,
    selectedSubPlumbingJob.name,
    setFormAttributes,
  ]);

  const handleFileChange = useCallback(
    (e) => {
      const fileList = e.target.files;
      const modifiedFilesList = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        const modifiedFile = new File(
          [file],
          `${selectedSubPlumbingJob.code}_${id}`,
          {
            type: file.type,
          }
        );
        modifiedFilesList.push(modifiedFile);
      }

      setSelectedAttributes({
        ...selectedAttributes,
        files: modifiedFilesList,
      });
      const previews = [];

      for (let i = 0; i < modifiedFilesList.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          previews.push(event.target.result);
          if (previews.length === modifiedFilesList.length) {
            setFilePreviews(previews);
          }
        };

        reader.readAsDataURL(modifiedFilesList[i]);
      }
    },
    [id, selectedAttributes, selectedSubPlumbingJob.code]
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

  const handleNext = useCallback(() => {
    if (selectedSubPlumbingJob.code) {
      addToList();
    }
    updateProgress(progress + 1);
  }, [addToList, progress, selectedSubPlumbingJob.code, updateProgress]);

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubPlumbingJob}
          onChange={(e) => {
            setSelectedSubPlumbingJob(e.value);
            setSelectedAttributes({});
            handleReset();
          }}
          options={PLumbingServices}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          lect={true}
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubPlumbingJob.code && (
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2 font-medium text-base">
            <h3 className="font-medium text-base text-[#0D0B01]">
              Number of Items
            </h3>
            <span className="flex items-center gap-2 font-medium text-base">
              {Rooms.map((room, index) => {
                return (
                  <span
                    key={index}
                    className={`flex flex-1 items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer ${
                      selectedAttributes.numberItems === room.room &&
                      "bg-[#00CF91] text-white"
                    }  `}
                    onClick={() =>
                      setSelectedAttributes({
                        ...selectedAttributes,
                        numberItems: room.room,
                      })
                    }
                  >
                    <h3 className="font-medium text-base text-center">
                      {room.room}
                    </h3>
                  </span>
                );
              })}
            </span>
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
