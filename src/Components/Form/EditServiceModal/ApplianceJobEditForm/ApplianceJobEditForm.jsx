import { useCallback, useEffect, useState } from "react";
import { useProgress } from "../../../../context/ProgressContext";
import { Rooms } from "../../../../Constants";

export const ApplianceJobEditForm = ({ service, setIsEditService }) => {
  const [editFormAttributes, setEditFormAttributes] = useState({});
  const { formAttributes, setFormAttributes } = useProgress();

  useEffect(() => {
    setEditFormAttributes({ ...service });
  }, [service]);

  const onSAveChanges = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: formAttributes.subServices.map((ser) =>
        ser.code === service.code ? editFormAttributes : ser
      ),
    });
    setIsEditService(false);
  }, [
    editFormAttributes,
    formAttributes,
    service.code,
    setFormAttributes,
    setIsEditService,
  ]);

  return (
    <section className="flex flex-col gap-5">
      <section className="flex flex-col gap-2 mt-3">
        <h3 className="font-medium text-base text-[#0D0B01]">
          Type of Appliance
        </h3>
        <span className="flex gap-3 items-center">
          <input
            checked={editFormAttributes.typeAppliance === "Oven"}
            onChange={() =>
              setEditFormAttributes({
                ...editFormAttributes,
                typeAppliance: "Oven",
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
            checked={editFormAttributes.typeAppliance === "Fridge"}
            onChange={() =>
              setEditFormAttributes({
                ...editFormAttributes,
                typeAppliance: "Fridge",
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
                  editFormAttributes.numberItems === room.room &&
                  "bg-[#00CF91] text-white"
                }  `}
                onClick={() =>
                  setEditFormAttributes({
                    ...editFormAttributes,
                    numberItems: room.room,
                  })
                }
              >
                <h3 className="font-medium text-base text-center">
                  {room.room}{" "}
                </h3>
              </span>
            );
          })}
        </span>
      </section>

      <span className="mt-3">
        <textarea
          value={editFormAttributes.specialRequest}
          onChange={(e) =>
            setEditFormAttributes({
              ...editFormAttributes,
              specialRequest: e.target.value,
            })
          }
          name="specialRequest"
          id="specialRequest"
          rows="5"
          className="w-full border border-[#E0E5ED] rounded-xl p-5 outline-none focus:border-[#96A0B5] transition-Colors ease-linear duration-200 placeholder:text-[#96A0B5] resize-none cursor-pointer"
          placeholder="Please describe any special requests"
        />
      </span>
      <span className="flex items-center justify-end gap-3">
        <button
          className="px-4 bg-white text-black font-medium text-base rounded-md py-3 hover:bg-green-50 border"
          onClick={() => setIsEditService(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 bg-[#00CF91] text-white font-medium text-base rounded-md py-3 hover:bg-opacity-90"
          onClick={() => onSAveChanges()}
        >
          Save Changes
        </button>
      </span>
    </section>
  );
};
