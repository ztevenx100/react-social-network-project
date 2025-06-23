import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando el sembrado...`);

  // 1. Limpiar la base de datos para asegurar un estado fresco
  // Se eliminan los posts primero por la restricción de clave foránea
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Base de datos limpiada.');

  // 2. Hashear una contraseña común para todos los usuarios
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 3. Crear 5 usuarios de prueba y un post para cada uno
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        password: hashedPassword,
        name: `Usuario`,
        lastname: `Prueba${i}`,
        alias: `user${i}`,
        birthdate: new Date(`199${i}-01-15T10:00:00Z`),
      },
    });

  console.log(`Creado usuario ${user.alias} con id: ${user.id}`);

    // Crear una publicación para este usuario
    await prisma.post.create({
      data: {
        title: `Post del usuario ${user.alias}`,
        content: `Este es el contenido del post de prueba creado por el seeder para ${user.alias}.`,
        authorId: user.id,
      },
    });

    console.log(`Creado post para el usuario ${user.alias}`);
  }

  console.log(`Sembrado finalizado.`);
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
