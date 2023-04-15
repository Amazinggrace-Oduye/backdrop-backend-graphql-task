import { prisma } from "../src/config/db";
import { IUser } from "../src/types/user";
import { UtilService } from "../src/helpers/util-services";

beforeAll(async () => {
  // create user
  await prisma.user.createMany({
    data: [
      {
        id: "06bf9abb-4622-489d-8de3-62b625359cbe",
        first_name: "Amazinggrace",
        middle_name: "ogechukwu",
        last_name: "oduye",
        is_verified: false,
      },

      {
        id: "947ab542-09a7-4a23-941d-812d072270ea",
        first_name: "Michael",
        middle_name: "chibuike",
        last_name: "Amakoh",
        is_verified: false,
      },
    ],
  });
});

console.log("✨ 2 products successfully created!");

afterAll(async () => {
  const deleteUser = prisma.user.deleteMany();

  await prisma.$transaction([deleteUser]);

  await prisma.$disconnect();
});

test("should match user acccount name", async () => {
  // The new customers details
  const testUser: IUser = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    first_name: "Amazinggrace",
    middle_name: "ogechukwu",
    last_name: "oduye",
    is_verified: false,
  };

  // Check if the new order was created by filtering on unique email field of the customer
  const userInDb = await prisma.user.findFirst({
    where: {
      id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    },
  });

  // Expect the new customer to have been created and match the input
  expect(testUser.first_name).toEqual(userInDb?.first_name);
  expect(testUser.last_name).toEqual(userInDb?.last_name);
  // Expect the new order to have been created and contain the new customer
  // expect(userInDb).toHaveProperty("data");
});

test("should update is_verified field to true of names match", async () => {
  // The existing customers email
  const testUser: IUser = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    first_name: "Amazinggrace",
    middle_name: "ogechukwu",
    last_name: "oduye",
    is_verified: false,
  };

  const userInD = await prisma.user.update({
    where: {
      id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    },
    data: { is_verified: true },
  });

  const testUserName = `${testUser.first_name} ${testUser.middle_name} ${testUser.last_name}`;
  const userInDbName = `${userInD?.first_name} ${userInD?.middle_name} ${userInD?.last_name}`;
  const levenshteinDistance = UtilService.getLlevenshteinDistance(
    testUserName,
    userInDbName
  );

  // expect(verifiedUser.id).toBe(true);
  expect(testUserName).toMatch(userInDbName);
  expect(levenshteinDistance).toBe(0);
});
test("should update is_verified field to true levenshteinDistance < 2", async () => {
  // The existing customers email
  const testUser: IUser = {
    id: "79e5d78a-6af1-4d16-a7aa-9cb43816f26c",
    first_name: "Amazingrace",
    middle_name: "ogechukwu",
    last_name: "oduye",
    is_verified: false,
  };

  const userInD = await prisma.user.update({
    where: {
      id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    },
    data: { is_verified: true },
  });

  const testUserName = `${testUser.first_name} ${testUser.middle_name} ${testUser.last_name}`;
  const userInDbName = `${userInD?.first_name} ${userInD?.middle_name} ${userInD?.last_name}`;
  const levenshteinDistance = UtilService.getLlevenshteinDistance(
    testUserName,
    userInDbName
  );

  console.log({ levenshteinDistance });
  expect(testUserName).not.toBe(userInDbName);
  expect(userInD.is_verified).toBeTruthy;
  expect(levenshteinDistance).toBe(1);
});
