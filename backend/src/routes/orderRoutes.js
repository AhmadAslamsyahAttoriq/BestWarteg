import { Router } from 'express';
import { createOrder, getMyOrders, deleteOrder, clearMyOrders } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', requireAuth, createOrder);
router.get('/', requireAuth, getMyOrders);
router.delete('/:id', requireAuth, deleteOrder);
router.delete('/', requireAuth, clearMyOrders);

export default router;
