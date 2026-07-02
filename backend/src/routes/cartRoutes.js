import { Router } from 'express';
import { getCart, addToCart, updateCartItem, clearCart } from '../controllers/cartController.js';

const router = Router();

router.get('/:sid', getCart);
router.post('/:sid', addToCart);
router.patch('/:sid/:key', updateCartItem);
router.delete('/:sid', clearCart);

export default router;
