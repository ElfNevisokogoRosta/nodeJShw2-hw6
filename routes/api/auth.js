const express = require("express");
const router = express.Router();
const userSchema = require("../../schemas/joiUserSchema");
const validationMiddleware = require("../../midllewares/validation");
const logingMiddleware = require("../../midllewares/loginMiddleware");
const {
  registration,
  login,
  logout,
  current,
} = require("../../controllers/auth");
const authorization = require("../../midllewares/authMidllewar");

router.post("/register", validationMiddleware(userSchema), registration);
router.post(
  "/login",
  validationMiddleware(userSchema),
  logingMiddleware,
  login
);
router.post("/logout", authorization, logout);
router.get("/current", authorization, current);
module.exports = router;
