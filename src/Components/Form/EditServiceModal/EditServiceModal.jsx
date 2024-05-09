import CloseIcon from "@mui/icons-material/Close";
import { useProgress } from "../../../context/ProgressContext";
import {
  ServiceTypeCode,
  PaintingJobCode,
  HomeCleaningJobCode,
  PestControlJobCode,
  GeneralJobCodes,
} from "../../../Constants";
import { ApplianceJobEditForm } from "./ApplianceJobEditForm";
import { InteriorPaintingJobEditForm } from "./InteriorPaintingJobEditForm";
import { PressureWashingJobEditForm } from "./PressureWashingJobEditForm";
import { ExteriorPaintingJobEditForm } from "./ExteriorPaintingJobEditForm";
import { DoorPaintingJobEditForm } from "./DoorPaintingJobEditForm";
import { CabinetPaintingJobEditForm } from "./CabinetPaintingJobEditForm";
import { FencePaintingJobEditForm } from "./FencePaintingJobEditForm";
import { RegularCleaningByHourJobEditForm } from "./RegularCleaningByHourJobEditForm";
import { RegularCleaningByAreaJobEditForm } from "./RegularCleaningByAreaJobEditForm";
import { DeepCleaningJobEditForm } from "./DeepCleaningJobEditForm";
import { GeneralPestJobEditForm } from "./GeneralPestJobEditForm";
import { CockroachPestJobEditForm } from "./CockroachPestJobEditForm";
import { MiscellaneousGeneralJobEditForm } from "./MiscellaneousGeneralJobEditForm";
import { PlumbingEditForm } from "./PlumbingEditForm";
import { HvacJobEditForm } from "./HvacJobEditForm";
import { ElectricJobEditForm } from "./ElectricJobEditForm";
import { CarpentryJobEditForm } from "./CarpentryJobEditForm";
import { LandScapingJobEditForm } from "./LandScapingJobEditForm";

export const EditServiceModal = ({ service, setIsEditService }) => {
  const { formAttributes } = useProgress();

  return (
    <section className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-10">
      <div className="w-screen h-screen bg-black bg-opacity-20 absolute top-0 left-0 z-20"></div>
      <section className="w-full sm_desktop:w-[50%] bg-white h-screen overflow-y-scroll sm_desktop:h-fit sm_desktop:max-h-[90vh] p-5 sm_tablet:p-10 flex flex-col gap-10 font-Onest rounded-[30px] relative z-30 popup">
        <div className="flex justify-center gap-2 flex-col">
          <span className="flex items-center justify-between">
            <h2 className="text-[#292C38] text-4xl font-bold">
              {service.name}
            </h2>
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setIsEditService(false)}
            />
          </span>
          <h4 className="font-medium text-sm text-[#868580]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Laudantium, consectetur facilis.
          </h4>
        </div>

        {formAttributes.selectedMainServiceCode === ServiceTypeCode.PAINTING &&
          service.code === PaintingJobCode.INTERIOR && (
            <InteriorPaintingJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode === ServiceTypeCode.PAINTING &&
          service.code === PaintingJobCode.EXTERIOR && (
            <ExteriorPaintingJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode === ServiceTypeCode.PAINTING &&
          service.code === PaintingJobCode.DOOR && (
            <DoorPaintingJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode === ServiceTypeCode.PAINTING &&
          service.code === PaintingJobCode.CABINET && (
            <CabinetPaintingJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode === ServiceTypeCode.PAINTING &&
          service.code === PaintingJobCode.FENCE && (
            <FencePaintingJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode === ServiceTypeCode.PAINTING &&
          service.code === PaintingJobCode.WASHING && (
            <PressureWashingJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.HOME_CLEANING &&
          service.code === HomeCleaningJobCode.REGULAR && (
            <RegularCleaningByHourJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.HOME_CLEANING &&
          service.code === HomeCleaningJobCode.MAINTAINANCE && (
            <RegularCleaningByAreaJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.HOME_CLEANING &&
          service.code === HomeCleaningJobCode.DEEP_CLEANING && (
            <DeepCleaningJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.PEST_CONTROL &&
          service.code === PestControlJobCode.ANT && (
            <GeneralPestJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}
        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.PEST_CONTROL &&
          service.code === PestControlJobCode.COCKROACH && (
            <CockroachPestJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}
        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.PEST_CONTROL &&
          service.code === PestControlJobCode.FLIES && (
            <GeneralPestJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}
        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.PEST_CONTROL &&
          service.code === PestControlJobCode.BUG && (
            <GeneralPestJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}
        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.PEST_CONTROL &&
          service.code === PestControlJobCode.RODENT && (
            <GeneralPestJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}
        {formAttributes.selectedMainServiceCode === ServiceTypeCode.GENERAL &&
          service.code === GeneralJobCodes.MISCELLANEOUS && (
            <MiscellaneousGeneralJobEditForm
              service={service}
              setIsEditService={setIsEditService}
            />
          )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.PLUMBING && (
          <PlumbingEditForm
            service={service}
            setIsEditService={setIsEditService}
          />
        )}

        {formAttributes.selectedMainServiceCode === ServiceTypeCode.HAVAC && (
          <HvacJobEditForm
            service={service}
            setIsEditService={setIsEditService}
          />
        )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.ELECTRICAL && (
          <ElectricJobEditForm
            service={service}
            setIsEditService={setIsEditService}
          />
        )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.CARPENTERY && (
          <CarpentryJobEditForm
            service={service}
            setIsEditService={setIsEditService}
          />
        )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.LANDSCAPING_LAWN && (
          <LandScapingJobEditForm
            service={service}
            setIsEditService={setIsEditService}
          />
        )}

        {formAttributes.selectedMainServiceCode ===
          ServiceTypeCode.APPLIANCE_REPAIR && (
          <ApplianceJobEditForm
            service={service}
            setIsEditService={setIsEditService}
          />
        )}
      </section>
    </section>
  );
};
