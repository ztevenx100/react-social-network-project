import { Router } from 'express';
import { loginUser, getProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Ruta de login
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario (protegida)
router.get('/profile', authMiddleware, getProfile);

// TODO: Implementar la ruta de registro

export default router;
