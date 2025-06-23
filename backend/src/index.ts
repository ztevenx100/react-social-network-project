import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import postsRoutes from './routes/posts.routes'; // Importar las rutas de posts
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes); // Usar las rutas de posts con el prefijo /api/posts

// Ruta para la documentación de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta de bienvenida mejorada
app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API - Social Network</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #f0f2f5;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                text-align: center;
                background: white;
                padding: 40px 50px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #1c1e21;
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            p {
                font-size: 1.1rem;
                color: #555;
            }
            a {
                display: inline-block;
                margin-top: 25px;
                padding: 12px 24px;
                background-color: #1877f2;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
            a:hover {
                background-color: #166fe5;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bienvenido a la API del Social Network</h1>
            <p>La API está funcionando correctamente. Para explorar los endpoints, visita la documentación interactiva.</p>
            <a href="/api-docs">Ir a la Documentación de Swagger</a>
        </div>
    </body>
    </html>
  `);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
