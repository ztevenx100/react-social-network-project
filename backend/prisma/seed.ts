import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Limpiar datos existentes para evitar conflictos al re-ejecutar el seed
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Hashear la contraseña para los usuarios de prueba
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);

  // Crear usuarios predefinidos
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: hashedPassword1,
      name: 'John',
      lastname: 'Doe',
      alias: 'johndoe',
      birthdate: new Date('1990-05-15'),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      password: hashedPassword2,
      name: 'Jane',
      lastname: 'Smith',
      alias: 'janesmith',
      birthdate: new Date('1992-08-22'),
    },
  });

  // Crear algunas publicaciones de prueba de forma masiva
  await prisma.post.createMany({
    data: [
      {
        title: '¡Mi primer post!',
        content: 'Hola a todos, este es mi primer post en esta increíble red social.',
        authorId: user1.id,
      },
      {
        title: 'Un día en el parque',
        content: 'Hoy fue un día maravilloso para pasear por el parque y disfrutar del sol.',
        authorId: user2.id,
      },
      {
        title: 'Explorando React 19',
        content: 'Las nuevas características de React 19, como las Actions, son un cambio de juego para el manejo de formularios. ¡Muy emocionado por lo que se viene!',
        authorId: user1.id,
      },
      {
        title: 'Nuevo récord personal 🏃‍♀️',
        content: '¡Logré correr 5km en menos de 25 minutos! La constancia y el entrenamiento dan sus frutos.',
        authorId: user2.id,
      },
      {
        title: 'Recomendación de libro',
        content: 'Acabo de terminar "El Proyecto Hail Mary" de Andy Weir. Si les gustó "El Marciano", este les va a encantar. 100% recomendado.',
        authorId: user2.id,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
