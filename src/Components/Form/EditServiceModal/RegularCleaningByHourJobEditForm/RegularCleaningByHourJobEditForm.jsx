import { useCallback, useEffect, useState } from "react";
import { useProgress } from "../../../../context/ProgressContext";
import { Rooms } from "../../../../Constants";

export const RegularCleaningByHourJobEditForm = ({
  service,
  setIsEditService,
}) => {
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
        <h3 className="font-medium text-base text-[#0D0B01]">Location Type</h3>
        <span className="flex gap-3 items-center">
          <input
            checked={!!editFormAttributes.villa}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
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
            checked={!!editFormAttributes.appartment}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
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
            checked={!!editFormAttributes.office}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
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
        <h3 className="font-medium text-base text-[#0D0B01]">
          Number of Cleaner (Supplier)
        </h3>
        <span className="flex items-center gap-2 font-medium text-base">
          {Rooms.map((room, index) => {
            return (
              <span
                key={index}
                className={`flex flex-1 items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer ${
                  editFormAttributes.cleaners === room.room &&
                  "bg-[#00CF91] text-white"
                }  `}
                onClick={() =>
                  setEditFormAttributes({
                    ...editFormAttributes,
                    cleaners: room.room,
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
        <h3 className="font-medium text-base text-[#0D0B01]">
          Number of Hours
        </h3>
        <span className="flex items-center gap-2 font-medium text-base">
          {Rooms.map((room, index) => {
            return (
              <span
                key={index}
                className={`flex flex-1 items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer ${
                  editFormAttributes.hours === room.room &&
                  "bg-[#00CF91] text-white"
                }  `}
                onClick={() =>
                  setEditFormAttributes({
                    ...editFormAttributes,
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
            checked={!!editFormAttributes.officeType}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
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
