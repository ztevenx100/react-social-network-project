import { Router, Request, Response } from 'express';

const router = Router();

// Ruta de login
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Lógica de autenticación aquí
  res.json({ message: 'Login exitoso', user: { username } });
});

// Ruta de registro
router.post('/register', (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  // Lógica de registro aquí
  res.status(201).json({ message: 'Usuario registrado con éxito', user: { username, email } });
});

export default router;
