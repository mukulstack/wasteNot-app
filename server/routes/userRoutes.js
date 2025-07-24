const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUsersById, deleteUser } = require("../controllers/userController");

const router = express.Router();

// User management routes
router.get("/", protect, adminOnly, getUsers); // get all users (admin only)
router.get("/:id", protect, getUsersById); // get specific user
//router.delete("/:id", protect, adminOnly, deleteUser); // delete a user (admin only)

module.exports = router;
