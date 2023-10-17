const Product = require("../models/Product");

const throwError = (res) => {
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

exports.createProduct = async (req, res) => {
  const { name, price, stock, store } = req.body;
  try {
    let isProduct = await Product.findOne({ name, store });
    if (isProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
    } else {
      const response = await Product.create({ name, price, stock, store });
      if (response) {
        return res.status(200).json({
          success: true,
          message: "Product created successfully",
        });
      }
    }
  } catch (err) {
    return throwError(res);
  }
};

exports.getProduct = async (req, res) => {
  const { store, search, page, perPage } = req?.body;
  try {
    const searchBy = {
      store: `${store}`,
      $or: [{ name: { $regex: search, $options: "i" } }],
    };
    const productCount = await Product.find(searchBy).count();
    const Products = await Product.find(searchBy)
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: Products,
      count: productCount,
    });
  } catch (err) {
    return throwError(res);
  }
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (product) {
      return res.status(200).json({ success: true, data: product });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No product found" });
    }
  } catch (err) {
    return throwError(res);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, store } = req.body;
  try {
    const product = await Product.find({ _id: id });
    if (product) {
      const updateFields = { name, price, stock, store };
      await Product.findOneAndUpdate({ _id: id }, { ...updateFields });
      return res
        .status(200)
        .json({ success: true, message: "Product updated successfully" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Product not found" });
    }
  } catch (err) {
    return throwError(res);
  }
};
