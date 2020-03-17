const express = require("express");
const productController = require("../controllers/product-service-controller");

const router = express.Router();
router.get("/get-all", productController.getAllProductServices);
router.get("/get-all-by-id", productController.getPrdSrcById);
router.get("/get-all-p-s", productController.getAllProductWithServices);
router.post("/add-new-product-service", productController.addNewProductService);
router.put("/update-product-service", productController.updateServiceInProduct);
router.delete(
  "/delete-product-service",
  productController.deleteProductService
);

module.exports = router;
