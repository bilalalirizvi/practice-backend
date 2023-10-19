const Shop = require("../models/Shop");

const throwError = (res) => {
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

exports.createShop = async (req, res) => {
  const { name, email, phoneNumber, address } = req.body;
  try {
    let isShop = await Shop.findOne({ name });
    if (isShop) {
      return res.status(400).json({
        success: false,
        message: "Shop already exists",
      });
    } else {
      const response = await Shop.create({
        name,
        email,
        phoneNumber,
        address,
      });
      if (response) {
        return res.status(200).json({
          success: true,
          message: "Shop created successfully",
        });
      }
    }
  } catch (err) {
    return throwError(res);
  }
};

exports.getShop = async (req, res) => {
  const { search, page, perPage } = req?.body;
  console.log(
    "🚀 ~ file: shop.js:39 ~ exports.getShop= ~ req?.body:",
    req?.body
  );
  try {
    const searchBy = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ],
    };
    const shopCount = await Shop.find(searchBy).count();
    const Shops = await Shop.find(searchBy)
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: Shops,
      count: shopCount,
    });
  } catch (err) {
    return throwError(res);
  }
};

exports.getSingleShop = async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await Shop.findOne({ _id: id });
    if (shop) {
      return res.status(200).json({ success: true, data: shop });
    } else {
      return res.status(200).json({ success: false, message: "No shop found" });
    }
  } catch (err) {
    return throwError(res);
  }
};

exports.updateShop = async (req, res) => {
  const { name, email, phoneNumber, address, _id } = req.body;
  try {
    const updateFields = { name, email, phoneNumber, address };
    await Shop.findByIdAndUpdate(_id, updateFields).then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Store updated successfully" });
    });
  } catch (err) {
    return throwError(res);
  }
};

exports.deleteShop = async (req, res) => {
  const { id } = req.params;
  try {
    await Shop.findByIdAndDelete(id).then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Shop Deleted successfully" });
    });
  } catch (err) {
    return throwError(res);
  }
};
