import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOneAndUpdate(
      { email: "admin@nexora.com" },
      { role: "admin" },
      { new: true },
    );

    if (!user) {
      console.log("User not found");
      return;
    }

    console.log(`${user.email} is now an admin`);

    await mongoose.disconnect();
  } catch (error) {
    console.error(error.message);
  }
};

makeAdmin();
