const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// ROUTES
router.post("/create", userController.createUser);
router.post("/get-all", userController.getUser);
router.get("/get/:id", userController.getSingleUser);
router.post("/update", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
