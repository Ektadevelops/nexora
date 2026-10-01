import mongoose from "mongoose";

const datasetRowSchema = new mongoose.Schema(
  {
    datasetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dataset",
      required: true,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const DatasetRow = mongoose.model("DatasetRow", datasetRowSchema);

export default DatasetRow;
