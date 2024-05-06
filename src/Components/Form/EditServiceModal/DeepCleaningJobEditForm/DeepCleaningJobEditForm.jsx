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

  return (
    <section className="flex flex-col gap-5">
      <section className="flex flex-col gap-2 mt-3">
        <h3 className="font-medium text-base text-[#0D0B01]">
          Type of Furniture
        </h3>
        <span className="flex gap-3 items-center">
          <input
            checked={!!editFormAttributes.sofa}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
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
            checked={!!editFormAttributes.mattress}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
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
            checked={!!editFormAttributes.mattress}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
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