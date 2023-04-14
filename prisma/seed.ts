import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//   "npx prisma db seed"
async function main() {
  // Delete all `User` and `Message` records

  await prisma.user.deleteMany({});
  // (Re-)Create dummy `User`records
  await prisma.user.createMany({
    data: [
      {
        id: "7fd8d46c-7225-4aff-91f2-94ae9c24a419",
        first_name: "Amazing",
        middle_name: "oge",
        last_name: "oduye",
      },

      {
        id: "947ab542-09a7-4a23-941d-812d072270ea",
        first_name: "Michael",
        middle_name: "chibuike",
        last_name: "Amakoh",
      },
      {
        id: "98b25a4e-2a24-42d3-b5f6-e26b1b4c21dd",
        first_name: "solomon",
        middle_name: "Nedu",
        last_name: "Igori",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
