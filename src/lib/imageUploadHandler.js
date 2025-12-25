import { supabase } from "./supabase";

export const handleImageUpload = async (blobInfo, progress) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get file from blob
      const file = blobInfo.blob();

      // Validate file
      if (!file.type.startsWith("image/")) {
        reject("Please select an image file!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        reject("File size should be less than 5MB!");
        return;
      }

      // Generate unique filename
      const fileExt = file.name ? file.name.split(".").pop() : "jpg";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `blogs/${fileName}`;

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from("project-images")
        .upload(filePath, file);

      if (error) throw error;

      // Return custom URL
      const imageUrl = `http://localhost:3000/api/image/upload/${fileName}`;

      console.log("Image uploaded:", imageUrl);
      resolve(imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      reject(error.message || "Upload failed!");
    }
  });
};
