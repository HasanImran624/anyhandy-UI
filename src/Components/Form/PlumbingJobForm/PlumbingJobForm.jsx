import { useState, useCallback } from "react";
import { Dropdown } from "primereact/dropdown";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../context/ProgressContext";
import { PLumbingServices, Rooms } from "../../../Constants";

export const PlumbingJobForm = () => {
  const [selectedSubPlumbingJob, setSelectedSubPlumbingJob] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const { formAttributes, setFormAttributes } = useProgress();

  const addToList = useCallback(() => {
    const altreadyAdded = !!formAttributes.subServices.find(
      (s) => s.code === selectedSubPlumbingJob.code
    );

    if (altreadyAdded) {
      setErrorText("* Service is already added");
      return;
    }

    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          code: selectedSubPlumbingJob.code,
          name: selectedSubPlumbingJob.name,
        },
      ],
    });
    setSelectedSubPlumbingJob({});
    setSelectedAttributes({});
  }, [
    formAttributes,
    selectedAttributes,
    selectedSubPlumbingJob.code,
    selectedSubPlumbingJob.name,
    setFormAttributes,
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

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
                      selectedAttributes.items === room.room &&
                      "bg-[#00CF91] text-white"
                    }  `}
                    onClick={() =>
                      setSelectedAttributes({
                        ...selectedAttributes,
                        items: room.room,
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
                  type="file"
                  name="attachment"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {selectedFile && (
                <p className="text-[#636363] text-sm">{selectedFile.name}</p>
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
              onClick={addToList}
            >
              <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
              <h4 className="font-semibold text-base">Add To the list</h4>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
