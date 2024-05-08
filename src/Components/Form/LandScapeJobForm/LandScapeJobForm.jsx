import { useState, useCallback } from "react";
import { Dropdown } from "primereact/dropdown";
import { useProgress } from "../../../context/ProgressContext";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { LawnCareJobs, Rooms } from "../../../Constants";

export const LandScapeJobForm = () => {
  const [selectedSubLandscapeJob, setSelectedSubLandscapeJob] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const { formAttributes, setFormAttributes } = useProgress();

  const addToList = useCallback(() => {
    const altreadyAdded = !!formAttributes.subServices.find(
      (s) => s.code === selectedSubLandscapeJob.code
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
          code: selectedSubLandscapeJob.code,
          name: selectedSubLandscapeJob.name,
        },
      ],
    });
    setSelectedSubLandscapeJob({});
    setSelectedAttributes({});
  }, [
    formAttributes,
    selectedAttributes,
    selectedSubLandscapeJob.code,
    selectedSubLandscapeJob.name,
    setFormAttributes,
  ]);
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

  return (
    <>
      <section className="flex flex-col gap-5">
        <h3 className="font-medium text-lg text-[#0D0B01]">
          Enter job description
        </h3>
        <Dropdown
          value={selectedSubLandscapeJob}
          onChange={(e) => {
            setSelectedSubLandscapeJob(e.value);
            setSelectedAttributes({});
          }}
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
                type="text"
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
