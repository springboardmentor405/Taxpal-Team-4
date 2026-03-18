const express = require("express");
const router  = express.Router();
const { getAll, generate } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",  protect, getAll);
router.post("/", protect, generate);

module.exports = router;