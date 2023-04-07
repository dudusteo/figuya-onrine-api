const express = require("express");
const auth_controller = require("../controllers/auth");

const router = express.Router();

router.post("/auth/login", auth_controller.login);
router.post("/auth/register", auth_controller.register);
router.get("/auth/validateToken", auth_controller.validateToken);

module.exports = router;
