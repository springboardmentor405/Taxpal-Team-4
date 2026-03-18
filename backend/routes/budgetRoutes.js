const express = require("express");
const router  = express.Router();
const { getAll, create, remove } = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",       protect, getAll);
router.post("/",      protect, create);
router.delete("/:id", protect, remove);

module.exports = router;