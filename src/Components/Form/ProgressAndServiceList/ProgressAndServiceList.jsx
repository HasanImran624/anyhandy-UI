import { useState } from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { useProgress } from "../../../context/ProgressContext";
import { LuPen } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import { useCallback } from "react";
import { EditServiceModal } from "../EditServiceModal";

export const ProgressAndServiceList = () => {
  const { progress, formAttributes, setFormAttributes } = useProgress();
  const [selectedEditSubService, setSelectedEditSubService] = useState();
  const [isEditService, setIsEditService] = useState(false);

  const onRemoveSubService = useCallback(
    (subService) => {
      setFormAttributes({
        ...formAttributes,
        subServices: formAttributes.subServices.filter(
          (sub) => sub.code !== subService.code
        ),
      });
    },
    [formAttributes, setFormAttributes]
  );

  const onEditServiceClick = useCallback(
    (subService) => {
      setIsEditService(true);
      setSelectedEditSubService(subService);
    },
    [setIsEditService, setSelectedEditSubService]
  );
  return (
    <>
      {isEditService && (
        <EditServiceModal
          service={selectedEditSubService}
          setIsEditService={setIsEditService}
        />
      )}
      <section className="w-full sm_desktop:w-[45%] flex flex-col gap-10 sm_desktop:flex-row">
        <div>
          <ProgressBar progress={progress} />
        </div>
        <div className="hidden sm_desktop:flex flex-col gap-5">
          <h2 className="font-Onest font-bold text-4xl leading-snug text-[#0D0B01]">
            Lets add sub services you need
          </h2>
          <p className="font-Onest font-medium text-lg text-[#868580] pr-[0%]">
            Select sub services and add details
          </p>
          <div className="flex flex-col gap-1">
            {formAttributes.subServices.map((subService, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-transparent hover:shadow-lg hover:bg-white p-4 rounded-xl transition-all ease-in-out duration-200"
              >
                <h4 className="font-medium text-base text-[#0D0B01]">
                  {subService.name}
                </h4>
                <span className="flex gap-3 items-center">
                  <LuPen
                    size={20}
                    color="#96A0B5"
                    className="cursor-pointer"
                    onClick={() => onEditServiceClick(subService)}
                  />
                  <BsTrash
                    size={20}
                    color="#96A0B5"
                    className="cursor-pointer"
                    onClick={() => onRemoveSubService(subService)}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
