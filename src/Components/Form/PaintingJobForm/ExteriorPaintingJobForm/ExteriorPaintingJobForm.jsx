import { Colors } from "../../../../Constants";

export const ExteriorPaintingJobForm = ({
  selectedAttributes,
  setSelectedAttributes,
}) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-base text-[#0D0B01]">
            App. size area
          </h3>
          <input
            type="number"
            name="areaSize"
            value={selectedAttributes.sizeArea}
            onChange={(e) =>
              setSelectedAttributes({
                ...selectedAttributes,
                sizeArea: e.target.value,
              })
            }
            className="w-full bg-white rounded-lg p-3 border"
            placeholder="Approximate area size e.g., 20"
          />
        </section>
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
                      selectedAttributes.paintColor === color.color
                        ? "border-[#00CF91]"
                        : "border-transparent"
                    }  `}
                  onClick={() =>
                    setSelectedAttributes({
                      ...selectedAttributes,
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
                type="checkbox"
                name="providePaint"
                checked={!!selectedAttributes.providePaint}
                id="providePaint"
                onChange={(e) =>
                  setSelectedAttributes({
                    ...selectedAttributes,
                    providePaint: e.target.checked,
                  })
                }
                className="w-4 h-4  accent-[#15a177]"
              />
              <label htmlFor="providePaint">I will provide paint</label>
            </span>
            <span className="flex gap-3 items-center">
              <input
                value={!!selectedAttributes.numberOfCoats}
                onChange={(e) =>
                  setSelectedAttributes({
                    ...selectedAttributes,
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
        </section>
      </div>
    </div>
  );
};
