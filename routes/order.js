const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

// ROUTES
router.post("/create", orderController.createOrder);
router.post("/get-all", orderController.getOrder);
// router.get("/get/:id", orderController.getSingleOrder);
// router.post("/update", orderController.updateOrder);
// router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;
