const express = require("express");
const router = express.Router();
const {registerUser, logoutUser} = require("../controllers/authController");
const {loginUser} = require("../controllers/authController");


router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser)


module.exports = router;