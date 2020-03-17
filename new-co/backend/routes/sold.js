const express = require("express");
const soldController = require("../controllers/sold-controller");

const router = express.Router();
router.get("/get-all", soldController.getAllSoldProducts);
router.get(
  "/get-all-sold-for-assistant",
  soldController.getAllSoldForAssistant
);
router.get("/get-all-sold-for-shop", soldController.getAllSoldForShop);
router.post("/add-new-sold", soldController.addNewSoldProduct);
router.delete("/delete-sold", soldController.deleteSoldProduct);
router.put("/update-sold", soldController.updateSoldProduct);

module.exports = router;
