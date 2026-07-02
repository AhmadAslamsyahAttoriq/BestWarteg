import { Router } from 'express';
import { getMenus, getCategories, getMenuById } from '../controllers/menuController.js';

const router = Router();

router.get('/', getMenus);
router.get('/categories', getCategories);
router.get('/:id', getMenuById);

export default router;
