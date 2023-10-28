import express from 'express';
import { getAllTasks, createTask, getTask, updateTask, deleteTask } from '../controllers/tasks.js';

const router = express.Router();
router.route('/').get().post();
router.route('/:id').get().patch().delete()

export default router;
