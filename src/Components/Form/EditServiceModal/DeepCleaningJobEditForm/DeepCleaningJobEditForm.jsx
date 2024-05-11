import { useCallback, useEffect, useState } from "react";
import { useProgress } from "../../../../context/ProgressContext";
import { Rooms } from "../../../../Constants";

export const DeepCleaningJobEditForm = ({ service, setIsEditService }) => {
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
        <h3 className="font-medium text-base text-[#0D0B01]">
          Type of Furniture
        </h3>
        <span className="flex gap-3 items-center">
          <input
            checked={editFormAttributes.typeFurniture === "Sofa"}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                typeFurniture: "Sofa",
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
            checked={editFormAttributes.typeFurniture === "Mattress"}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                typeFurniture: "Mattress",
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
            checked={editFormAttributes.typeFurniture === "Carpet"}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                typeFurniture: "Carpet",
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
                  editFormAttributes.items === room.room &&
                  "bg-[#00CF91] text-white"
                }  `}
                onClick={() =>
                  setEditFormAttributes({
                    ...editFormAttributes,
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
        <h3 className="font-medium text-base text-[#0D0B01]">Size of Items</h3>
        <input
          value={editFormAttributes.itemSize}
          onChange={(e) =>
            setEditFormAttributes({
              ...editFormAttributes,
              itemSize: e.target.value,
            })
          }
          type="text"
          name="itemSize"
          className="w-full bg-white rounded-lg p-3 border"
          placeholder=""
        />
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
            accept="image/*"
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
