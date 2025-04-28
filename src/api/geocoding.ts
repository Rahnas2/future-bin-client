import axios from "axios";
import { AddressType } from "@/types/Address";


export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
  return await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
}

export const getAddressSuggestions = async (query: string) => {
  try {
    if (!query) return [];

    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 5,
      },
    });

    return response.data || [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};


export const getCoordinatesFromSuggestion = (place: any) => {
  return {
    type: "Point",
    coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
  };
};


export const geocodeFullAddress = async (addressData: AddressType) => {
  try {
    const query = [
      addressData.street,
      addressData.houseNo,
      addressData.district,
      addressData.city,
      addressData.pincode
    ].filter(Boolean).join(", ");

    if (!query) return null;

    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: query,
        format: "json",
        limit: 1,
      },
    });

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        type: "Point",
        coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
      };
    }

    return null;
  } catch (error) {
    console.error("Manual geocoding failed:", error);
    return null;
  }
};
