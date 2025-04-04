import toast from "react-hot-toast";

export const getPosition = async (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          toast.error("Geolocation is not supported by your browser");
          return reject("Geolocation not supported");
        }
    
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            console.log("position ", position);
            resolve({longitude, latitude,  }); // ✅ Properly resolves here
          },
          (error) => {
            toast.error("Unable to retrieve your location");
            console.error(error);
            reject(error); // ✅ Properly rejects on error
          }
        );
      })   
}