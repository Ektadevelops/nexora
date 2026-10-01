import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      enum: ["Sales", "Finance", "HR", "Marketing", "Operations", "Other"],
      default: "Other",
    },

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Dataset = mongoose.model("Dataset", datasetSchema);

export default Dataset;
