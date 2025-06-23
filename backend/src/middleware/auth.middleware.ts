import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos el tipo Request de Express para incluir la propiedad userId
export interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificamos el token y extraemos el payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

    // Añadimos el userId al objeto request para que esté disponible en las rutas protegidas
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};