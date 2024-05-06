import { useCallback, useState } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useProgress } from "../../../../context/ProgressContext";
import { GeneralJobCodes, GeneralJobNames } from "../../../../Constants";

export const MiscellaneousJobForm = ({ setSelectedSubGeneralJob }) => {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errorText, setErrorText] = useState("");
  const { formAttributes, setFormAttributes } = useProgress();

  const addToList = useCallback(() => {
    const altreadyAdded = !!formAttributes.subServices.find(
      (s) => s.code === GeneralJobCodes.MISCELLANEOUS
    );

    if (altreadyAdded) {
      setErrorText("* Service is already added");
      return;
    }

    setFormAttributes({
      ...formAttributes,
      subServices: [
        ...formAttributes.subServices,
        {
          ...selectedAttributes,
          code: GeneralJobCodes.MISCELLANEOUS,
          name: GeneralJobNames.MISCELLANEOUS,
        },
      ],
    });
    setSelectedSubGeneralJob({});
  }, [
    formAttributes,
    selectedAttributes,
    setFormAttributes,
    setSelectedSubGeneralJob,
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2 font-medium text-base">
        <section className="flex flex-col gap-2 mt-3">
          <h3 className="font-medium text-base text-[#0D0B01]">Description</h3>
          <span className="mt-3">
            <textarea
              value={selectedAttributes.specialRequest}
              onChange={(e) =>
                setSelectedAttributes({
                  ...selectedAttributes,
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
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-base text-[#0D0B01]">Attachments</h3>
          <label className="w-full bg-white rounded-lg p-3 border cursor-pointer">
            Choose file...
            <input
              type="file"
              name="attachment"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {selectedFile && (
            <p className="text-[#636363] text-sm">{selectedFile.name}</p>
          )}
        </section>
        {!!errorText && (
          <span
            style={{ color: "#dc2626" }}
            className="font-semibold text-base"
          >
            {errorText}
          </span>
        )}
        <section
          className="flex gap-2 items-center mt-5 cursor-pointer"
          onClick={addToList}
        >
          <ControlPointRoundedIcon style={{ fill: "#00CF91" }} />
          <h4 className="font-semibold text-base">Add To the list</h4>
        </section>
      </div>
    </div>
  );
};
