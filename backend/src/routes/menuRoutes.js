import { Router } from 'express';
import { getMenus, getCategories, getMenuById, createMenu, deleteMenu } from '../controllers/menuController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getMenus);
router.get('/categories', getCategories);
router.get('/:id', getMenuById);
router.post('/', requireAuth, requireAdmin, createMenu);
router.delete('/:id', requireAuth, requireAdmin, deleteMenu);

export default router;