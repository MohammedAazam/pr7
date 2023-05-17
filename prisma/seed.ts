import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const client = new PrismaClient();

async function main() {
  await client.user.deleteMany();
  await client.donation_camp.deleteMany();
  await client.patient.deleteMany();
  await client.donated_history.deleteMany();

  for (let i = 0; i < 10; i++) {
    const user = await client.user.create({
      data:{
        u_id: faker.datatype.number(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        blood_group: faker.helpers.arrayElement(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        email: faker.internet.email(),
        age: parseInt(faker.random.numeric(2)),
        date_of_birth: faker.date.past(),
        ph_no: faker.phone.number("+91 ##### #####"),
        location: faker.address.city(),
      }
    });
  }

  for (let i = 0; i < 10; i++) {
    const donationCamp = await client.donation_camp.create({
      data: {
        name: faker.random.words(),
        email: faker.internet.email(),
        ph_no: parseInt(faker.phone.number("+91 ##### #####")),
        location: faker.address.city(),
        permission_letter: faker.random.words(),
        associated_hospital: faker.random.words(),
      },
    });
  }

  for (let i = 0; i < 10; i++) {
    const patient = await client.patient.create({
      data: {
        p_id: faker.datatype.bigInt(),
        name: faker.name.fullName(),
        password: faker.internet.password(),
        blood_group: faker.helpers.arrayElement(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        email: faker.internet.email(),
        age: parseInt(faker.random.numeric(2)),
        dob: faker.date.past(),
        ph_no: faker.phone.number("+91 ##### #####"),
        location: faker.address.city(),
        req_donation: faker.datatype.boolean(),
        medical_history: faker.lorem.paragraph(),
      },
    });
  }

  for (let i = 0; i < 10; i++) {
    const donated_history = await client.donated_history.create({
      data: {
        donated_time_date: faker.date.past(),
        user:{
          create: {
            u_id: faker.datatype.number(),
            name: faker.name.fullName(),
            email: faker.internet.email(),
            age:  parseInt(faker.random.numeric(2)),
            date_of_birth: faker.date.past(),
            ph_no: faker.phone.number("+91 ##### #####"),
            location: faker.address.city(),
            password: faker.internet.password(),
            blood_group: faker.helpers.arrayElement(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
            gender: faker.helpers.arrayElement(['Male', 'Female']),
          },
        },
        patient: {
          create: {
            p_id: faker.datatype.bigInt(),
            name: faker.name.fullName(),
        password: faker.internet.password(),
        blood_group: faker.helpers.arrayElement(['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        email: faker.internet.email(),
        age: parseInt(faker.random.numeric(2)),
        dob: faker.date.past(),
        ph_no: faker.phone.number("+91 ##### #####"),
        location: faker.address.city(),
        req_donation: faker.datatype.boolean(),
        medical_history: faker.lorem.paragraph(),
          },
        },
      },
    });

  }
}

(async () => {
  try {
    await client.$connect();
    await main();
    console.log("Seed data generated!");
  } catch (error) {
    console.error("Error generating seed data:", error);
  } finally {
    await client.$disconnect();
  }
})();
