import express from "express";

import {
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks,
} from "../controllers/taskController.js"

const router = express.Router();

router.get('/',getTasks);
router.post('/',createTasks);
router.put('/:id',updateTasks);
router.delete('/:id',deleteTasks);

export default router;