const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

// ROUTES
router.post("/create", productController.createProduct);
router.post("/get-all", productController.getProduct);
router.get("/get/:id", productController.getSingleProduct);
router.post("/update/:id", productController.updateProduct);

module.exports = router;
