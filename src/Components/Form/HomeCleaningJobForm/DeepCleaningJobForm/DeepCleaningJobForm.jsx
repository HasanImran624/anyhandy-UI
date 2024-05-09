import { Rooms } from "../../../../Constants";

export const DeepCleaningJobForm = ({
  selectedAttributes,
  setSelectedAttributes,
}) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">
            Type of Furniture
          </h3>
          <span className="flex gap-3 items-center">
            <input
              checked={selectedAttributes.typeFurniture === "Sofa"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
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
              checked={selectedAttributes.typeFurniture === "Mattress"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
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
              checked={selectedAttributes.typeFurniture === "Carpet"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
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
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-base text-[#0D0B01]">
            Size of Items
          </h3>
          <input
            type="number"
            value={selectedAttributes.itemSize}
            onChange={(e) =>
              setSelectedAttributes({
                ...selectedAttributes,
                itemSize: e.target.value,
              })
            }
            name="itemSize"
            className="w-full bg-white rounded-lg p-3 border"
            placeholder=""
          />
        </section>
      </div>
    </div>
  );
};
