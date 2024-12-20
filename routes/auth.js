const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Email yang anda inputkan tidak valid.")
      .custom((value, { req }) => {
        if (value === "afridhoikhsan@gmail.com") {
          throw new Error("Email tersebut sudah diblacklist!");
        }

        return true;
      }),
    body(
      "password",
      "Kata sandi yang anda inputkan tidak valid. Kata sandi hanya boleh diisi dengan huruf dan angka dan minimal 5 karakter"
    )
      .isAlphanumeric()
      .isLength({ min: 5 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Kata sandi tidak cocok!");

      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
