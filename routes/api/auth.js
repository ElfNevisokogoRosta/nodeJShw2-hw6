const express = require("express");
const router = express.Router();
const userSchema = require("../../schemas/joiUserSchema");
const validationMiddleware = require("../../midllewares/validation");
const logingMiddleware = require("../../midllewares/loginMiddleware");
const upload = require("../../midllewares/upload");
const {
  registration,
  login,
  logout,
  current,
  updateAvatar,
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
router.patch("/avatars", authorization, upload.single("avatar"), updateAvatar);
module.exports = router;
