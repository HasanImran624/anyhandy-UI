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

  const handleFileChange = useCallback(
    (e) => {
      setEditFormAttributes({ ...editFormAttributes, files: e.target.files });
    },
    [editFormAttributes]
  );

  const getFileNames = useCallback(() => {
    if (editFormAttributes.files) {
      let names = [];
      for (let i = 0; i < editFormAttributes.files.length; i++) {
        names.push(editFormAttributes.files[i].name);
      }
      return names.join(", ");
    }
  }, [editFormAttributes.files]);

  return (
    <section className="flex flex-col gap-5">
      <section className="flex flex-col gap-2 mt-3">
        <h3 className="font-medium text-base text-[#0D0B01]">Location Type</h3>
        <span className="flex gap-3 items-center">
          <input
            checked={editFormAttributes.locationType === "Villa"}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                locationType: "Villa",
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
            checked={editFormAttributes.locationType === "Apartment"}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                locationType: "Apartment",
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
            checked={editFormAttributes.locationType === "Office"}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                locationType: "Office",
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
                  editFormAttributes.numberCleaner === room.room &&
                  "bg-[#00CF91] text-white"
                }  `}
                onClick={() =>
                  setEditFormAttributes({
                    ...editFormAttributes,
                    numberCleaner: room.room,
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
                  editFormAttributes.numberHours === room.room &&
                  "bg-[#00CF91] text-white"
                }  `}
                onClick={() =>
                  setEditFormAttributes({
                    ...editFormAttributes,
                    numberHours: room.room,
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
          Provide Supplies
        </h3>
        <span className="flex gap-3 items-center">
          <input
            value={editFormAttributes.provideSupplies}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                provideSupplies: e.target.checked,
              })
            }
            type="checkbox"
            name="provideSupplies"
            id="provideSupplies"
            className="w-4 h-4  accent-[#15a177]"
          />
          <label htmlFor="provideSupplies">Provide Supplies</label>
        </span>
      </section>
      <section className="flex flex-col gap-2">
        <h3 className="font-medium text-base text-[#0D0B01]">Attachments</h3>
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
        {editFormAttributes.files && (
          <p className="text-[#636363] text-sm">{getFileNames()}</p>
        )}
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
