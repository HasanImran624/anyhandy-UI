import axios from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { GEOLOCATION_API_KEY } from "../../Constants";

export function useGetAddressByLatAndLon(lat, long) {
  return useQuery({
    queryKey: ["GetAddress", lat, long],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=${GEOLOCATION_API_KEY}`
      );

      return data.results?.[0]?.formatted_address;
    },
    enabled: !!lat && !!long && !!GEOLOCATION_API_KEY,
  });
}
