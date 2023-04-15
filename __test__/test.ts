import { prisma } from "../src/config/db";
import { IInputUserData, IUser } from "../src/types/user";
import { UtilService } from "../src/helpers/util-services";
import { RemotePaystackSevice } from "../src/remote/paystack";
import { IPaystack } from "../src/types/paystack";

beforeAll(async () => {
  // create user
  await prisma.user.createMany({
    data: [
      {
        id: "06bf9abb-4622-489d-8de3-62b625359cbe",
        first_name: "ogechukwu",
        middle_name: "Amazinggrace",
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
  const testUser: IUser = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    first_name: "ogechukwu",
    middle_name: "Amazinggrace",
    last_name: "oduye",
    is_verified: false,
  };
  const testUserInput: IInputUserData = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    account_name: `${testUser.first_name} ${testUser.middle_name} ${testUser.last_name}`,
    account_number: "0055852601",
    bank_code: "044",
    bank_name: "access bank",
  };

  const userInDb = await prisma.user.findFirst({
    where: {
      id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    },
  });

  const testUserName =
    `${testUser.first_name} ${testUser.middle_name} ${testUser.last_name}`.toLowerCase();

  const dataFromPaystack = (await RemotePaystackSevice.verifyAccountNumber({
    account_number: testUserInput.account_number,
    bank_code: testUserInput.bank_code,
  })) as IPaystack;

  const userPaystackName = dataFromPaystack.data.account_name.toLowerCase();
  // Expect the new customer to have been created and match the input
  expect(testUser.first_name).toEqual(userInDb?.first_name);
  expect(testUser.last_name).toEqual(userInDb?.last_name);
  expect(dataFromPaystack).toHaveProperty("data");
  expect(dataFromPaystack.data.account_number).toEqual(
    testUserInput.account_number
  );
  expect(testUserName).toEqual(userPaystackName);
});

test("should update is_verified field to true of names match", async () => {
  const testUser: IUser = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    first_name: "ogechukwu",
    middle_name: "Amazinggrace",
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

  expect(testUserName).toMatch(userInDbName);
  expect(levenshteinDistance).toBe(0);
});
test("should update is_verified field to true levenshteinDistance < 2", async () => {
  const testUser: IUser = {
    id: "79e5d78a-6af1-4d16-a7aa-9cb43816f26c",
    first_name: "ogechukwu",
    middle_name: "Amazingrace",
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

  expect(testUserName).not.toBe(userInDbName);
  expect(userInD.is_verified).toBeTruthy;
  expect(levenshteinDistance).toBe(1);
});
