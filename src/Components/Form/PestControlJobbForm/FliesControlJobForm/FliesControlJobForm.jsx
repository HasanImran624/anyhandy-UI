import { useCallback, useState } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { Rooms } from "../../../../Constants";
import { useProgress } from "../../../../context/ProgressContext";
import { PestControlJobCode, PestControlJobNames } from "../../../../Constants";

export const FliesControlJobForm = ({ setSelectedSubPestControlJob }) => {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const { formAttributes, setFormAttributes } = useProgress();

  const addToList = useCallback(() => {
    const altreadyAdded = !!formAttributes.subServices.find(
      (s) => s.code === PestControlJobCode.FLIES
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
          code: PestControlJobCode.FLIES,
          name: PestControlJobNames.FLIES,
        },
      ],
    });
    setSelectedSubPestControlJob({});
  }, [
    formAttributes,
    selectedAttributes,
    setFormAttributes,
    setSelectedSubPestControlJob,
  ]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">
            Number of Rooms
          </h3>
          <span className="flex items-center gap-2 font-medium text-base">
            {Rooms.map((room, index) => {
              return (
                <span
                  key={index}
                  className={`flex flex-1 items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer ${
                    selectedAttributes.rooms === room.room &&
                    "bg-[#00CF91] text-white"
                  }  `}
                  onClick={() =>
                    setSelectedAttributes({
                      ...selectedAttributes,
                      rooms: room.room,
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
                  villa: true,
                  apartment: false,
                  office: false,
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
              checked={!!selectedAttributes.apartment}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  villa: false,
                  apartment: true,
                  office: false,
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
                  villa: false,
                  apartment: false,
                  office: true,
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
        {!!errorText && (
          <span
            style={{ color: "#dc2626" }}
            className="font-semibold text-base"
          >
            {errorText}
          </span>
        )}
        <section className="flex flex-col gap-2">
          <span
            className="flex gap-2 items-center mt-5 cursor-pointer"
            onClick={addToList}
          >
            <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
            <h4 className="font-semibold text-base">Add To the list</h4>
          </span>
        </section>
      </div>
    </div>
  );
};
