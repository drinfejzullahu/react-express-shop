const express = require("express");
const shopController = require("../controllers/shop-controller");

const router = express.Router();
router.get("/get-all", shopController.getAllShops);
router.post("/add-new-shop", shopController.addNewShop);
router.put("/update-shop-name", shopController.updateShopNm);
router.put("/update-shop", shopController.updateShop);
router.delete("/delete-shop", shopController.deleteShop);

module.exports = router;
