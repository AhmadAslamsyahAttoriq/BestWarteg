import { Router } from 'express';
import { checkVoucher } from '../controllers/voucherController.js';

const router = Router();

router.post('/', checkVoucher);

export default router;
