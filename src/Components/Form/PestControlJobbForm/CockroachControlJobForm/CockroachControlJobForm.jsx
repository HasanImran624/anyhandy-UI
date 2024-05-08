import { Rooms } from "../../../../Constants";

export const CockroachControlJobForm = ({
  selectedAttributes,
  setSelectedAttributes,
}) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">Type of Room</h3>
          <span className="flex gap-3 items-center">
            <input
              checked={selectedAttributes.roomType === "Kitchen"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  roomType: "Kitchen",
                })
              }
              type="radio"
              name="roomType"
              id="kitchen"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="kitchen">Kitchen</label>
          </span>
          <span className="flex gap-3 items-center">
            <input
              checked={selectedAttributes.roomType === "Bathroom"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  roomType: "Bathroom",
                })
              }
              type="radio"
              name="roomType"
              id="bathroom"
              className="w-4 h-4  accent-[#15a177]"
            />
            <label htmlFor="bathroom">Bathroom</label>
          </span>
        </section>
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
            Location Type
          </h3>
          <span className="flex gap-3 items-center">
            <input
              checked={selectedAttributes.locationType === "Villa"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
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
              checked={selectedAttributes.locationType === "Apartment"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
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
              checked={selectedAttributes.locationType === "Office"}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
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
          <span className="flex gap-3 items-center">
            <input
              checked={!!selectedAttributes.forOfficeType}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
                  forOfficeType: e.target.checked,
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
      </div>
    </div>
  );
};
