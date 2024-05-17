import axios from "../../api/axios";
import { useMutation } from "@tanstack/react-query";

export function useEdittJob() {
  const token = localStorage.getItem("jwt");

  return useMutation({
    mutationFn: async (request) => {
      const { data } = await axios.put(
        `job/edit-job-post/${request.id}`,
        request.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
  });
}
