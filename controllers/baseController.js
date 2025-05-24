// controllers/baseController.js
const asyncHandler = require('express-async-handler');

class BaseController {
  constructor(model) {
    this.model = model;

    // Bind methods to ensure `this` is preserved
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.getById = asyncHandler(this.getById.bind(this));
    this.createOne = asyncHandler(this.createOne.bind(this));
    this.createMany = asyncHandler(this.createMany.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
  }

  async getAll(req, res) {
    const documents = await this.model.find();
    if (!documents) {
      res.status(404);
      throw new Error('No documents found');
    }
    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  }

  async getById(req, res) {
    const { id } = req.params;
    const document = await this.model.findById(id);
    if (!document) {
      res.status(404);
      throw new Error('Document not found');
    }
    res.status(200).json({
      success: true,
      data: document,
    });
  }

  async createOne(req, res) {
    const document = await this.model.create(req.body);
    if (!document) {
      res.status(400);
      throw new Error('Invalid data');
    }
    res.status(201).json({
      success: true,
      data: document,
    });
  }

  //createMany
  async createMany(req, res) {
    const documents = await this.model.insertMany(req.body);
    res.status(201).json({
      success: true,
      data: documents,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const document = await this.model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      res.status(404);
      throw new Error('Document not found');
    }
    res.status(200).json({
      success: true,
      data: document,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const document = await this.model.findByIdAndDelete(id);
    if (!document) {
      res.status(404);
      throw new Error('Document not found');
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  }
}

module.exports = BaseController;
