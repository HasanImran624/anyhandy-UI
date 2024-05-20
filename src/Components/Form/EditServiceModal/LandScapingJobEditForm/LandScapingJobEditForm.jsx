import { useEditFormAttributes } from "../../../../Hooks";

export const LandScapingJobEditForm = ({ service, setIsEditService }) => {
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
      <section className="flex flex-col gap-2">
        <h3 className="font-medium text-base text-[#0D0B01]">App. size area</h3>
        <input
          type="number"
          name="areaSize"
          value={editFormAttributes.sizeArea}
          onChange={(e) => setAttribute("sizeArea", e.target.value)}
          className="w-full bg-white rounded-lg p-3 border"
          placeholder="Approximate area size e.g., 20"
        />
      </section>
      <section className="flex flex-col gap-2 mt-3">
        <h3 className="font-medium text-base text-[#0D0B01]">Description</h3>
        <span className="mt-3">
          <textarea
            value={editFormAttributes.specialRequest}
            onChange={(e) => setAttribute("specialRequest", e.target.value)}
            name="specialRequest"
            id="specialRequest"
            rows="5"
            className="w-full border border-[#E0E5ED] rounded-xl p-5 outline-none focus:border-[#96A0B5] transition-Colors ease-linear duration-200 placeholder:text-[#96A0B5] resize-none cursor-pointer"
            placeholder="Please describe any special requests"
          />
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
