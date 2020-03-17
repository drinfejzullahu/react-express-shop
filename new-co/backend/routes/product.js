const express = require("express");
const productController = require("../controllers/product-controller");

const router = express.Router();
router.get("/get-all", productController.getAllProducts);
router.get(
  "/get-products-out-of-stock",
  productController.getProductsOutOfStock
);
router.post("/add-new-product", productController.addNewProduct);
router.put("/update-product-quantity", productController.updateProductQuantity);
router.put("/update-product", productController.updtProduct);
router.put("/change-product-state", productController.changeState);
router.delete("/delete-product", productController.deleteProduct);

module.exports = router;
