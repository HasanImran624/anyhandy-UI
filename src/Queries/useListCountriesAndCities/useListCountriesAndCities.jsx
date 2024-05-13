import axios from "../../api/axios";
import { useQuery } from "react-query";
import { GET_LIST_COUNTRIES_CITIES } from "../../Constants";

export function useListCountriesAndCities() {
  const token = localStorage.getItem("jwt");

  return useQuery(
    "useListCountriesAndCities",
    async function getActiveInsuranceProfiles() {
      const { data } = await axios.get(`${GET_LIST_COUNTRIES_CITIES}`, {
        params: {
          token,
        },
      });
      return data;
    },
    {
      enabled: !!token,
    }
  );
}
