import { useCallback, useState } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../../context/ProgressContext";
import {
  Rooms,
  HomeCleaningJobCode,
  HomeCleaningJobNames,
} from "../../../../Constants";

export const DeepCleaningJobForm = ({ setSelectedSubHomeCleaningJob }) => {
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
      (s) => s.code === HomeCleaningJobCode.DEEP_CLEANING
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
          code: HomeCleaningJobCode.DEEP_CLEANING,
          name: HomeCleaningJobNames.DEEP_CLEANING,
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
            Type of Furniture
          </h3>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.sofa}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  sofa: true,
                  mattress: false,
                  carpet: false,
                })
              }
              type="radio"
              name="furnitureType"
              id="sofa"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="sofa">Sofa</label>
          </span>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.mattress}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  sofa: false,
                  mattress: true,
                  carpet: false,
                })
              }
              type="radio"
              name="furnitureType"
              id="mattress"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="mattress">Mattress</label>
          </span>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.mattress}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  sofa: false,
                  mattress: true,
                  carpet: false,
                })
              }
              type="radio"
              name="furnitureType"
              id="carpet"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="carpet">Carpet</label>
          </span>
        </section>
        <section className="flex flex-col gap-2 mt-3">
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
                    {" "}
                    {room.room}{" "}
                  </h3>
                </span>
              );
            })}
          </span>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-base text-[#0D0B01]">
            Size of Items
          </h3>
          <input
            value={selectedAttributes.itemSize}
            onChange={(e) =>
              setSelectedAttributes({
                ...selectedAttributes,
                itemSize: e.target.value,
              })
            }
            type="text"
            name="itemSize"
            className="w-full bg-white rounded-lg p-3 border"
            placeholder=""
          />
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
