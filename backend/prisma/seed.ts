import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el sembrado de la base de datos...');

  // Hashear la contraseña para el usuario de prueba
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Crear un usuario de prueba
  const user1 = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Usuario',
      lastname: 'DePrueba',
      birthdate: new Date('1995-11-17T03:24:00'),
      alias: 'testuser',
    },
  });

  console.log(`Creado/actualizado usuario: ${user1.name} con email ${user1.email}`);

  // Puedes añadir más datos aquí, por ejemplo, posts para el usuario de prueba
  const post1 = await prisma.post.create({
    data: {
      title: 'Mi primer post', // Añadido el campo title que faltaba
      content: 'Hola a todos, ¡bienvenidos a mi nuevo post! Esto fue creado desde el seeder.',
      authorId: user1.id,
    },
  });

  console.log(`Creado post de prueba para el usuario: "${user1.alias}"`);

  console.log('Sembrado completado.');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
