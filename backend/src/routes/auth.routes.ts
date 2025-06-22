import { Router } from 'express';
import { loginUser } from '../controllers/auth.controller';

const router = Router();

// Ruta de login
router.post('/login', loginUser);

// TODO: Implementar la ruta de registro

export default router;
