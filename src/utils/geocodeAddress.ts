import { AddressType } from "@/types/Address";
import axios from "axios";

export const geocodeAddress = async (addressData: AddressType) => {
    console.log('myr ivider varunnu ', addressData)
    try {
      // Only proceed if we have enough address information
      if (!addressData.city && !addressData.pincode) return;
      
      // Create a query string from the address components
      const query = [
        addressData.street,
        addressData.houseNo,
        addressData.district,
        addressData.city,
        addressData.pincode
      ].filter(Boolean).join(", ");
      
      // Call the geocoding API
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      
      // Check if we got results
      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        return {
          type: 'Point',
          coordinates: [parseFloat(result.lon), parseFloat(result.lat)]
        };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };