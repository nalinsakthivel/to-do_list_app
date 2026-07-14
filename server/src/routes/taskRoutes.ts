import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/taskController';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
