import { Router } from 'express';
import { register, login, adminLogin, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin); // login khusus admin, terpisah dari login pelanggan
router.get('/me', requireAuth, me);

export default router;
