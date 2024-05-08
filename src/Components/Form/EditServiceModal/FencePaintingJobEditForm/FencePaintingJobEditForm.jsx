import { useCallback, useEffect, useState } from "react";
import { useProgress } from "../../../../context/ProgressContext";
import { Rooms, Colors } from "../../../../Constants";

export const FencePaintingJobEditForm = ({ service, setIsEditService }) => {
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
      <div className="flex flex-col gap-2">
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-base text-[#0D0B01]">
            App. size area
          </h3>
          <input
            type="text"
            value={editFormAttributes.sizeArea}
            onChange={(e) =>
              setEditFormAttributes({
                ...editFormAttributes,
                sizeArea: e.target.value,
              })
            }
            name="areaSize"
            className="w-full bg-white rounded-lg p-3 border"
            placeholder="Approximate area size e.g., 20"
          />
        </section>
      </div>
      <section className="flex flex-col gap-2">
        <h3 className="font-medium text-base text-[rgb(13,11,1)]">
          Choose a color
        </h3>
        <span className="flex items-center gap-3 font-medium text-base">
          {Colors.map((color, index) => {
            return (
              <span
                key={index}
                className={`flex w-10 h-10 items-center justify-center gap-2 border-2 rounded-full cursor-pointer
                          ${
                            editFormAttributes.paintColor === color.color
                              ? "border-[#00CF91]"
                              : "border-transparent"
                          }  `}
                onClick={() =>
                  setEditFormAttributes({
                    ...editFormAttributes,
                    paintColor: color.color,
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
              checked={editFormAttributes.providePaint}
              onChange={(e) =>
                setEditFormAttributes({
                  ...editFormAttributes,
                  providePaint: e.target.checked,
                })
              }
              type="checkbox"
              name="providePaint"
              id="providePaint"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="providePaint">I will provide paint</label>
          </span>
          <span className="flex gap-3 items-center">
            <input
              checked={editFormAttributes.numberOfCoats}
              onChange={(e) =>
                setEditFormAttributes({
                  ...editFormAttributes,
                  numberOfCoats: e.target.checked,
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
