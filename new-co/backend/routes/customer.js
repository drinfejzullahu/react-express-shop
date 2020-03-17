const express = require("express");
const customerController = require("../controllers/customer-controller");

const router = express.Router();
router.get("/get-all", customerController.getAllCustomers);
router.get("/get-by-id", customerController.getOneCustomerById);
router.post("/add-new-customer", customerController.addNewCustomer);
router.put("/update-customer", customerController.updateCustomer);
router.delete("/delete-customer", customerController.deleteCustomer);

module.exports = router;
