import { useEditFormAttributes } from "../../../../Hooks";
import { Rooms } from "../../../../Constants";

export const RegularCleaningByHourJobEditForm = ({
  service,
  setIsEditService,
}) => {
  const {
    editFormAttributes,
    filePreviews,
    handleFileChange,
    getFileNames,
    setAttribute,
    onSaveChanges,
  } = useEditFormAttributes(service, setIsEditService);

  return (
    <section className="flex flex-col gap-5">
      <section className="flex flex-col gap-2 mt-3">
        <h3 className="font-medium text-base text-[#0D0B01]">Location Type</h3>
        <span className="flex gap-3 items-center">
          <input
            checked={editFormAttributes.locationType === "Villa"}
            onChange={(e) => setAttribute("locationType", "Villa")}
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
            onChange={(e) => setAttribute("locationType", "Apartment")}
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
            onChange={(e) => setAttribute("locationType", "Office")}
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
                onClick={() => setAttribute("numberCleaner", room.room)}
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
                onClick={() => setAttribute("numberHours", room.room)}
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
            checked={editFormAttributes.provideSupplies}
            onChange={(e) => setAttribute("provideSupplies", e.target.checked)}
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
        <div className="flex flex-wrap gap-2" id="filePreviews">
          {filePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ))}
        </div>
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
          onClick={onSaveChanges}
        >
          Save Changes
        </button>
      </span>
    </section>
  );
};
