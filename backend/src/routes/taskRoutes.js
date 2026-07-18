const express = require("express");
const auth = require("../middleware/auth");
const { createTask, getUserTasks, getSingleTask, updateTask, deleteSingleTask } = require("../controllers/taskController");
const router = express.Router();

router.use(auth);

router.get("/", getUserTasks)

router.post("/create", createTask);
router.get("/:id", getSingleTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteSingleTask);

module.exports = router;
