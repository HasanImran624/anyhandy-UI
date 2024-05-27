import axios from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { GET_LIST_COUNTRIES_CITIES } from "../../Constants";

export function useListCountriesAndCities() {
  const token = localStorage.getItem("jwt");

  return useQuery({
    queryKey: ["useListCountriesAndCities"],
    queryFn: async () => {
      const { data } = await axios.get(`${GET_LIST_COUNTRIES_CITIES}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
}
