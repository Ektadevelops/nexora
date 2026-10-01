import fs from "fs";

import { parseExcelFile, parseCsvFile } from "../services/fileParserService.js";

import Dataset from "../models/Dataset.js";
import DatasetRow from "../models/DatasetRow.js";

export const uploadDatasetFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an Excel or CSV file",
      });
    }

    const { name, description = "", category = "Other" } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Dataset name is required",
      });
    }

    const filePath = req.file.path;

    const extension = req.file.originalname.split(".").pop().toLowerCase();

    let parsedData;

    if (extension === "xlsx") {
      parsedData = await parseExcelFile(filePath);
    } else if (extension === "csv") {
      parsedData = parseCsvFile(filePath);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
      });
    }

    if (!parsedData.rows.length) {
      return res.status(400).json({
        success: false,
        message: "The uploaded file contains no data",
      });
    }

    const dataset = await Dataset.create({
      name,
      description,
      category,
      createdBy: req.user.userId,
    });

    const rowsToInsert = parsedData.rows.map((row) => ({
      datasetId: dataset._id,
      createdBy: req.user.userId,
      data: row,
    }));

    await DatasetRow.insertMany(rowsToInsert);

    fs.unlinkSync(filePath);

    res.status(201).json({
      success: true,
      message: "Dataset uploaded successfully",

      dataset: {
        id: dataset._id,
        name: dataset.name,
        category: dataset.category,
        rowCount: rowsToInsert.length,
      },

      columns: parsedData.headers,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
