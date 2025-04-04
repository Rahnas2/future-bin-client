import axios from "axios"

export const uploadImage = async (image: File, folder: string) => {
    console.log('coming here', image)
    const formData = new FormData()
    formData.append('file', image)
    formData.append("upload_preset", "future-bin-react")
    formData.append("folder", folder)

    try {
        const response = await axios.post(
          import.meta.env.VITE_CLOUDINARY_URI,
          formData
        );
        console.log("Uploaded Image URL:", response.data.secure_url);
        return { url: response.data.secure_url, publicId: response.data.public_id };
      } catch (error) {
        console.error("Upload Error:", error);
        return null;
      }
}


// export const deleteImage = async (publicId: string) => {
//   try {
//       const timestamp = Math.floor(new Date().getTime() / 1000);
//       const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
      
//       // Generate the signature using your Cloudinary secret key
//       const signatureResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-signature`, {
//           paramsToSign
//       });

//       const signature = signatureResponse.data.signature;

//       const response = await axios.post(
//           `${import.meta.env.VITE_CLOUDINARY_URI}/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`,
//           {
//               public_id: publicId,
//               signature,
//               api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
//               timestamp,
//           }
//       );

//       console.log("Delete Response:", response.data);
//       return response.data;
//   } catch (error) {
//       console.error("Delete Error:", error);
//       return null;
//   }
// };