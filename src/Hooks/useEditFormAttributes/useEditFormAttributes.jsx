import { useState, useCallback, useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";

export const useEditFormAttributes = (service, setIsEditService) => {
  const { formAttributes, setFormAttributes } = useProgress();
  const [editFormAttributes, setEditFormAttributes] = useState({});
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    setEditFormAttributes({ ...service });
    const previews = [];
    service.files?.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === service.files.length) {
          setFilePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [service]);
  console.log("previews", filePreviews);
  const onSaveChanges = useCallback(() => {
    setFormAttributes({
      ...formAttributes,
      subServices: formAttributes.subServices.map((ser) =>
        ser.uuid === service.uuid ? editFormAttributes : ser
      ),
    });
    setIsEditService(false);
  }, [
    editFormAttributes,
    formAttributes,
    service.uuid,
    setFormAttributes,
    setIsEditService,
  ]);

  const handleFileChange = useCallback(
    (e) => {
      const fileList = e.target.files;
      const modifiedFilesList = [];
      const previews = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const modifiedFile = new File(
          [file],
          `${service.code}_${service.uuid}`,
          {
            type: file.type,
          }
        );
        modifiedFilesList.push(modifiedFile);

        const reader = new FileReader();
        reader.onload = (event) => {
          previews.push(event.target.result);
          if (previews.length === fileList.length) {
            setFilePreviews(previews);
          }
        };
        reader.readAsDataURL(modifiedFile);
      }
      setEditFormAttributes({
        ...editFormAttributes,
        files: modifiedFilesList,
      });
    },
    [editFormAttributes, service.code, service.uuid]
  );

  const getFileNames = useCallback(() => {
    if (editFormAttributes.files) {
      return editFormAttributes.files.map((file) => file.name).join(", ");
    }
  }, [editFormAttributes.files]);

  const setAttribute = useCallback((name, value) => {
    setEditFormAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: value,
    }));
  }, []);

  return {
    editFormAttributes,
    filePreviews,
    handleFileChange,
    getFileNames,
    setAttribute,
    onSaveChanges,
  };
};
