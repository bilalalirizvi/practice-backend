const Order = require("../models/Order");
const Product = require("../models/Product");

const throwError = (res) => {
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

exports.createOrder = async (req, res) => {
  const { store, user, product } = req.body;
  const netTotal = product.reduce((accumulator, curValue) => {
    return accumulator + curValue?.price * curValue?.quantity;
  }, 0);

  try {
    await Order.create({ store, user, product, netTotal });
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (err) {
    return throwError(res);
  }
};

exports.getOrder = async (req, res) => {
  const { store, search, page, perPage } = req?.body;
  try {
    const searchBy = {
      store: `${store}`,
      // $or: [{ name: { $regex: search, $options: "i" } }],
    };
    const orderCount = await Order.find(searchBy).count();
    const Orders = await Order.find(searchBy)
      .populate("product.productId user")
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: Orders,
      count: orderCount,
    });
  } catch (err) {
    return throwError(res);
  }
};

// exports.getSingleOrder = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const order = await Order.findOne({ _id: id });
//     if (order) {
//       return res.status(200).json({ success: true, data: order });
//     } else {
//       return res
//         .status(200)
//         .json({ success: false, message: "No Order found" });
//     }
//   } catch (err) {
//     return throwError(res);
//   }
// };

// exports.updateOrder = async (req, res) => {
//   const { store, user, product, _id } = req.body;
//   try {
//     const updateFields = { store, user, product};
//     await Order.findByIdAndUpdate(_id, updateFields).then(() => {
//       return res
//         .status(200)
//         .json({ success: true, message: "Order updated successfully" });
//     });
//   } catch (err) {
//     return throwError(res);
//   }
// };

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id).then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Order Deleted successfully" });
    });
  } catch (err) {
    return throwError(res);
  }
};
