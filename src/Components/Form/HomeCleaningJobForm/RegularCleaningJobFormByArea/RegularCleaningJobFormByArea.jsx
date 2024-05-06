import { useCallback, useState } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../../context/ProgressContext";
import {
  Rooms,
  HomeCleaningJobCode,
  HomeCleaningJobNames,
  AreaType,
} from "../../../../Constants";

export const RegularCleaningJobFormByArea = ({
  setSelectedSubHomeCleaningJob,
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const { formAttributes, setFormAttributes } = useProgress();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const addToList = useCallback(() => {
    const altreadyAdded = !!formAttributes.subServices.find(
      (s) => s.code === HomeCleaningJobCode.MAINTAINANCE
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
          code: HomeCleaningJobCode.MAINTAINANCE,
          name: HomeCleaningJobNames.MAINTAINANCE,
        },
      ],
    });
    setSelectedSubHomeCleaningJob({});
  }, [
    formAttributes,
    setFormAttributes,
    selectedAttributes,
    setSelectedSubHomeCleaningJob,
  ]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">
            Location Type
          </h3>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.villa}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  office: false,
                  appartment: false,
                  villa: true,
                })
              }
              type="radio"
              name="locationType"
              id="villa"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="villa">Villa</label>
          </span>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.appartment}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  office: false,
                  appartment: true,
                  villa: false,
                })
              }
              type="radio"
              name="locationType"
              id="apartment"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="apartment">Apartment</label>
          </span>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.office}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  office: true,
                  appartment: false,
                  villa: false,
                })
              }
              type="radio"
              name="locationType"
              id="office"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="office">Office</label>
          </span>
        </section>
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">Type of Area</h3>
          <span className="flex items-center gap-2 font-medium text-base flex-wrap">
            {AreaType.map((a, index) => {
              return (
                <span
                  key={index}
                  className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer ${
                    selectedAttributes.areaType === a.area &&
                    "bg-[#00CF91] text-white"
                  }`}
                  onClick={() =>
                    setSelectedAttributes({
                      ...selectedAttributes,
                      areaType: a.area,
                    })
                  }
                  style={{ minWidth: "5rem" }} // Set minimum width
                >
                  <h3 className="font-medium text-base text-center">
                    {a.area}
                  </h3>
                </span>
              );
            })}
          </span>
        </section>
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">
            Number of Hours
          </h3>
          <span className="flex items-center gap-2 font-medium text-base">
            {Rooms.map((room, index) => {
              return (
                <span
                  key={index}
                  className={`flex flex-1 items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer ${
                    selectedAttributes.hours === room.room &&
                    "bg-[#00CF91] text-white"
                  }  `}
                  onClick={() =>
                    setSelectedAttributes({
                      ...selectedAttributes,
                      hours: room.room,
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
        </section>
        <section className="flex flex-col gap-2 mt-3">
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.officeType}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  officeType: e.target.checked,
                })
              }
              type="checkbox"
              name="officeType"
              id="officeType"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="provideSupplies">For Office Type</label>
          </span>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-base text-[#0D0B01]">Attachments</h3>
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
  );
};
