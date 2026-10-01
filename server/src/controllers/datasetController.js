import Dataset from "../models/Dataset.js";

export const createDataset = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Dataset name is required",
      });
    }

    const dataset = await Dataset.create({
      name,
      description,
      category,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Dataset created successfully",
      dataset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({
      createdBy: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: datasets.length,
      datasets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: "Dataset not found",
      });
    }

    res.json({
      success: true,
      dataset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateDataset = async (req, res) => {
  try {
    const { name, description, category, status } = req.body;

    const dataset = await Dataset.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.userId,
      },
      {
        name,
        description,
        category,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: "Dataset not found",
      });
    }

    res.json({
      success: true,
      message: "Dataset updated successfully",
      dataset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: "Dataset not found",
      });
    }

    res.json({
      success: true,
      message: "Dataset deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
