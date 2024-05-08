import { useState, useCallback, useMemo } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../../context/ProgressContext";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { ElectricalJobs, Rooms } from "../../../Constants";

export const ElectricalJobForm = () => {
  const navigate = useNavigate();
  const [selectedSubElectricalJob, setSelectedSubElectricalJob] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const {
    formAttributes,
    setFormAttributes,
    progress,
    updateProgress,
    resetAttributes,
  } = useProgress();

  const alreadyAdded = useMemo(
    () =>
      !!formAttributes.subServices.find(
        (s) => s.code === selectedSubElectricalJob.code
      ),
    [formAttributes.subServices, selectedSubElectricalJob.code]
  );

  const addToList = useCallback(() => {
    if (alreadyAdded) {
      setErrorText("* Service is already added");
    }

    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          code: selectedSubElectricalJob.code,
          name: selectedSubElectricalJob.name,
        },
      ],
    });
    setSelectedSubElectricalJob({});
    setSelectedAttributes({});
  }, [
    alreadyAdded,
    formAttributes,
    selectedAttributes,
    selectedSubElectricalJob.code,
    selectedSubElectricalJob.name,
    setFormAttributes,
  ]);

  const add = useCallback(() => {
    if (alreadyAdded) {
      setErrorText("* Service is already added");
      return;
    }
    addToList();
  }, [addToList, alreadyAdded]);

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

  const handleNext = useCallback(() => {
    if (selectedSubElectricalJob.code) {
      if (!alreadyAdded) {
        addToList();
      }
    }
    updateProgress(progress + 1);
  }, [
    addToList,
    alreadyAdded,
    progress,
    selectedSubElectricalJob.code,
    updateProgress,
  ]);

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubElectricalJob}
          onChange={(e) => {
            setSelectedSubElectricalJob(e.value);
            setSelectedAttributes({});
          }}
          options={ElectricalJobs}
          optionLabel="name"
          scrollHeight={"250px"}
          highlightOnSe
          placeholder="Choose an option"
          className="w-full md:w-14rem border border-[#E0E5ED] p-2 rounded-xl"
        />
      </section>

      {selectedSubElectricalJob.code && (
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
