import { useCallback, useState } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { Rooms, Colors } from "../../../../Constants";
import { useProgress } from "../../../../context/ProgressContext";
import { PaintingJobCode, PaintingJobNames } from "../../../../Constants";

export const CabinetPaintingJobForm = ({ setSelectedSubPaintingJob }) => {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const { formAttributes, setFormAttributes } = useProgress();

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

  const addToList = useCallback(() => {
    const altreadyAdded = !!formAttributes.subServices.find(
      (s) => s.code === PaintingJobCode.CABINET
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
          code: PaintingJobCode.CABINET,
          name: PaintingJobNames.CABINET,
        },
      ],
    });
    setSelectedSubPaintingJob({});
  }, [
    formAttributes,
    selectedAttributes,
    setFormAttributes,
    setSelectedSubPaintingJob,
  ]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <h3 className="font-medium text-base text-[#0D0B01]">
          Number of Cabinets
        </h3>
        <span className="flex items-center gap-2 font-medium text-base">
          {Rooms.map((room, index) => {
            return (
              <span
                key={index}
                className={`flex flex-1 items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer ${
                  selectedAttributes.cabinets === room.room &&
                  "bg-[#00CF91] text-white"
                }  `}
                onClick={() =>
                  setSelectedAttributes({
                    ...selectedAttributes,
                    cabinets: room.room,
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
          <h3 className="font-medium text-base text-[rgb(13,11,1)]">
            Choose a color
          </h3>
          <span className="flex items-center justify-between font-medium text-base">
            {Colors.map((color, index) => {
              return (
                <span
                  key={index}
                  className={`flex w-10 h-10 items-center justify-center gap-2 border-2 rounded-full cursor-pointer
                    ${
                      selectedAttributes.color === color.color
                        ? "border-[#00CF91]"
                        : "border-transparent"
                    }  `}
                  onClick={() =>
                    setSelectedAttributes({
                      ...selectedAttributes,
                      color: color.color,
                    })
                  }
                >
                  <span
                    className="w-7 h-7 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${color.color}, ${color.color}80)`,
                    }}
                  ></span>
                </span>
              );
            })}
          </span>
          <div className="w-full flex items-center gap-[5%] mt-3">
            <span className="flex gap-3 items-center">
              <input
                type="checkbox"
                name="providePaint"
                checked={!!selectedAttributes.paintProvided}
                id="providePaint"
                onChange={(e) =>
                  setSelectedAttributes({
                    ...selectedAttributes,
                    paintProvided: e.target.checked,
                  })
                }
                className="w-4 h-4  accent-[#15a177]"
              />
              <label htmlFor="providePaint">I will provide paint</label>
            </span>
            <span className="flex gap-3 items-center">
              <input
                value={!!selectedAttributes.doubleCoat}
                onChange={(e) =>
                  setSelectedAttributes({
                    ...selectedAttributes,
                    doubleCoat: e.target.checked,
                  })
                }
                type="checkbox"
                name="coats"
                id="coats"
                className="w-4 h-4  accent-[#15a177]"
              />
              <label htmlFor="coats">Require 2 coats</label>
            </span>
          </div>
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
        </section>
      </div>
    </div>
  );
};
