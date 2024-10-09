import { Router } from 'express';
import { createUser } from '../controllers/authController.js';

const router = Router();

router.post('/', createUser)

export default router;