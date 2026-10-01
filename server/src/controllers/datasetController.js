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
    const {
      search = "",
      category,
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const pageLimit = Math.min(Math.max(Number(limit), 1), 100);
    const skip = (currentPage - 1) * pageLimit;

    const filter = {
      createdBy: req.user.userId,
    };

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    const sortOrder = order === "asc" ? 1 : -1;

    const [datasets, total] = await Promise.all([
      Dataset.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(pageLimit),

      Dataset.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / pageLimit);

    res.json({
      success: true,
      count: datasets.length,
      pagination: {
        total,
        page: currentPage,
        limit: pageLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
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
