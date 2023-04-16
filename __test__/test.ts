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
      },

      {
        id: "947ab542-09a7-4a23-941d-812d072270ea",
        first_name: "Michael",
        middle_name: "chibuike",
        last_name: "Promise",
      },
    ],
  });
});

console.log("✨ 2 Users successfully created!");

afterAll(async () => {
  const deleteUser = prisma.user.deleteMany({
    where: {
      id: {
        in: [
          "06bf9abb-4622-489d-8de3-62b625359cbe",
          "947ab542-09a7-4a23-941d-812d072270ea",
        ],
      },
    },
  });

  await prisma.$transaction([deleteUser]);

  await prisma.$disconnect();
  console.log("✨ 2 Users successfully deleted!");
});

test("should match user acccount name", async () => {
  const testUser: IUser = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    first_name: "ogechukwu",
    middle_name: "Amazinggrace",
    last_name: "oduye",
    is_verified: false,
  };
  const testUserInpute: IInputUserData = {
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
    account_number: testUserInpute.account_number,
    bank_code: testUserInpute.bank_code,
  })) as IPaystack;

  const userPaystackName = dataFromPaystack.data.account_name.toLowerCase();

  expect(testUser.first_name).toEqual(userInDb?.first_name);
  expect(testUser.last_name).toEqual(userInDb?.last_name);
  expect(dataFromPaystack).toHaveProperty("data");
  expect(dataFromPaystack.data.account_number).toEqual(
    testUserInpute.account_number
  );
  expect(testUserName).toMatch(userPaystackName);
});

test("should update is_verified field to true if names match and levenshteinDistance < 2", async () => {
  const testUser: IUser = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    first_name: "ogechukwu",
    middle_name: "Amazinggrace",
    last_name: "oduye",
    is_verified: false,
  };
  const testUserInpute: IInputUserData = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    account_name: `${testUser.first_name} ${testUser.middle_name} ${testUser.last_name}`,
    account_number: "0055852601",
    bank_code: "044",
    bank_name: "access bank",
  };

  const userInD = await prisma.user.update({
    where: {
      id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    },
    data: { is_verified: true },
  });

  const userInDbName = `${userInD?.first_name} ${userInD?.middle_name} ${userInD?.last_name}`;
  const levenshteinDistance = UtilService.getLlevenshteinDistance(
    testUserInpute.account_name,
    userInDbName
  );

  expect(testUserInpute.account_name).toMatch(userInDbName);
  expect(levenshteinDistance).toBe(0);
  expect(userInD.is_verified).toBeTruthy;
});
test("should return user name if user is already verified", async () => {
  const testUser: IUser = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    first_name: "ogechukwu",
    middle_name: "Amazinggrace",
    last_name: "oduye",
    is_verified: false,
  };

  const testUserInpute: IInputUserData = {
    id: "06bf9abb-4622-489d-8de3-62b625359cbe",
    account_name: `${testUser.first_name} ${testUser.middle_name} ${testUser.last_name}`,
    account_number: "0055852601",
    bank_code: "044",
    bank_name: "access bank",
  };

  const userInDb = await prisma.user.findFirst({
    where: { id: "06bf9abb-4622-489d-8de3-62b625359cbe" },
  });
  const testUserName = `${testUser.first_name} ${testUser.middle_name} ${testUser.last_name}`;

  expect(userInDb?.id).toEqual(testUser.id);
  expect(userInDb?.is_verified).toBeTruthy;
  expect(testUserName).toBe(testUserInpute.account_name);
});
