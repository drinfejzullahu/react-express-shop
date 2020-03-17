const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();
router.get("/get-all", userController.getAllUsers);
router.get("/get-roles", userController.getAllRoles);
router.post("/add-new-user", userController.addNewUser);
router.post("/add-new-shop-assistant", userController.addShopAssistant);
router.put("/update-user-password", userController.updateUserPassword);
router.put("/update-user", userController.updateUser);
router.delete("/delete-user", userController.deleteUser);

module.exports = router;
