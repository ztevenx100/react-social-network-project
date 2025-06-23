import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/posts.routes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Ruta de bienvenida
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Bienvenido a la API del Social Network</h1>');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
