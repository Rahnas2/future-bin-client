export const cancelReasons = () => {
    return  {
        user: [
          "Change of Plans",
          "Waste Already Disposed",
          "Pickup Scheduled at Wrong Time",

        ],
        collector: [
          "Vehicle Breakdown",
          "Unable to Locate Address",
          "Hazardous Waste Detected (Not Allowed)",
        ]
      };
}