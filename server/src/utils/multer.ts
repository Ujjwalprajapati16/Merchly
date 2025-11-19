import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "products/variants", 
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      public_id: file.originalname.split(".")[0], 
    };
  },
});

export const upload = multer({ storage });
