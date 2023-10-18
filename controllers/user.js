const User = require("../models/User");

const throwError = (res) => {
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  try {
    let isUser = await User.findOne({ email: email?.toLowerCase() });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const response = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
      });
      if (response) {
        return res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      }
    }
  } catch (err) {
    return throwError(res);
  }
};

exports.getUser = async (req, res) => {
  const { search, page, perPage } = req?.body;
  try {
    const searchBy = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
    const userCount = await User.find(searchBy).count();
    const Users = await User.find(searchBy)
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: Users,
      count: userCount,
    });
  } catch (err) {
    return throwError(res);
  }
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      return res.status(200).json({ success: true, data: user });
    } else {
      return res.status(200).json({ success: false, message: "No user found" });
    }
  } catch (err) {
    return throwError(res);
  }
};

exports.updateUser = async (req, res) => {
  // const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, _id } = req.body;
  try {
    // const user = await User.find({ _id: id });
    // if (user) {
    const updateFields = { firstName, lastName, email, phoneNumber };
    await User.findByIdAndUpdate(_id, updateFields).then(() => {
      return res
        .status(200)
        .json({ success: true, message: "User updated successfully" });
    });
    // } else {
    //   return res
    //     .status(200)
    //     .json({ success: false, message: "User not found" });
    // }
  } catch (err) {
    console.log("🚀 ~ file: user.js:94 ~ exports.updateUser= ~ err:", err);
    return throwError(res);
  }
};
