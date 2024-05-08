import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../context/ProgressContext";
import {
  Rooms,
  ApplianceRepairJobCode,
  ApplianceRepairJobNames,
} from "../../../Constants";

export const ApplienceRepairJobForm = () => {
  const navigate = useNavigate();
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const {
    formAttributes,
    setFormAttributes,
    resetAttributes,
    updateProgress,
    progress,
  } = useProgress();

  const alreadyAdded = useMemo(
    () =>
      !!formAttributes.subServices.find(
        (s) => s.code === ApplianceRepairJobCode.FIXING
      ),
    [formAttributes.subServices]
  );

  const addToList = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          code: ApplianceRepairJobCode.FIXING,
          name: ApplianceRepairJobNames.FIXING,
        },
      ],
    });
  }, [setFormAttributes, formAttributes, selectedAttributes]);

  const handleNext = useCallback(() => {
    if (!alreadyAdded) {
      console.log("I am in");
      addToList();
    }
    updateProgress(progress + 1);
  }, [addToList, alreadyAdded, progress, updateProgress]);

  const add = useCallback(() => {
    if (alreadyAdded) {
      setErrorText("* Service is already added");
      return;
    }
    addToList();
  }, [addToList, alreadyAdded]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">
            Type of Appliance
          </h3>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.oven}
              onChange={() =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  oven: true,
                  fridge: false,
                })
              }
              type="radio"
              name="applianceType"
              id="oven"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="oven">Oven</label>
          </span>
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.fridge}
              onChange={() =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  oven: false,
                  fridge: true,
                })
              }
              type="radio"
              name="applianceType"
              id="fridge"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="fridge">Fridge</label>
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
            Details of Issue
          </h3>
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
              placeholder=""
            ></textarea>
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
        <section
          className="flex gap-2 items-center mt-5 cursor-pointer"
          onClick={add}
        >
          <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
          <h4 className="font-semibold text-base">Add To the list</h4>
        </section>
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
      </div>
    </div>
  );
};
