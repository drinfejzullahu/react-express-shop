const express = require("express");
const serviceController = require("../controllers/service-controller");

const router = express.Router();
router.get("/get-all", serviceController.getAllServices);
router.get("/get-service-by-id", serviceController.getOneServiceById);
router.post("/add-new-service", serviceController.addNewService);
router.put("/update-service-state", serviceController.updateServiceState);
router.put("/update-service", serviceController.updateService);
router.delete("/delete-service", serviceController.deleteService);

module.exports = router;
