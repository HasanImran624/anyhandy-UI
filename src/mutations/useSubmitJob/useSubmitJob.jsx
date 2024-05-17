import axios from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { SUBMIT_JOB_REQUEST_URL } from "../../Constants";

export function useSubmitJob() {
  const token = localStorage.getItem("jwt");

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(SUBMIT_JOB_REQUEST_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
}
