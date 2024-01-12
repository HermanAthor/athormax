const mongodbURI =
  "mongodb+srv://Athor:DTD4qK3FUc2d29Gi@cluster0.emyjvme.mongodb.net/";
import mongoose from "mongoose";

export const mongodbconnect = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongodbURI);
      console.log(process.env.MONGODB_URI);
    }
  } catch (error) {
    console.log(error);
  }
};
