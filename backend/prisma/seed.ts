import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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
      name: 'Usuario de Prueba',
      password: hashedPassword,
    },
  });

  console.log(`Creado/actualizado usuario: ${user1.name} con email ${user1.email}`);

  // Puedes añadir más datos aquí, por ejemplo, posts para el usuario de prueba
  const post1 = await prisma.post.create({
    data: {
      title: 'Este es mi primer post',
      content: 'Hola a todos, ¡bienvenidos a mi nuevo post! Esto fue creado desde el seeder.',
      published: true,
      authorId: user1.id,
    },
  });

  console.log(`Creado post de prueba: "${post1.title}"`);

  console.log('Sembrado completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
