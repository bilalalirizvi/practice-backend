const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

// ROUTES
router.post("/create", shopController.createShop);
router.post("/get-all", shopController.getShop);
router.get("/get/:id", shopController.getSingleShop);
router.post("/update", shopController.updateShop);
router.delete("/delete/:id", shopController.deleteShop);

module.exports = router;
