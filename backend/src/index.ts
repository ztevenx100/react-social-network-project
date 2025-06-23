import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import postsRoutes from './routes/posts.routes'; // Importar las rutas de posts
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes); // Usar las rutas de posts con el prefijo /api/posts

// Ruta para la documentación de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta de bienvenida
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Bienvenido a la API del Social Network</h1>');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
