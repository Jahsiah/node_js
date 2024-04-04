const express = require("express");
const UsersController = require("../controllers/UsersController");
const router = express.Router();

router.get("/users", UsersController.index);
router.post("/users", UsersController.store);
router.get("/users:id", UsersController.show);
router.put("/users:id", UsersController.update);
router.delete("/users:id", UsersController.delete);

module.exports = router;
