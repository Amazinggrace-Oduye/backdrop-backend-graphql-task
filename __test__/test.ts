import { ApolloServer } from "@apollo/server";
import { access } from "fs";
import { schema } from "../src/graphql/schema";

test("returns account name input by user", async () => {
  const query = `#graphql
    query Query($getAccountNameId: String!, $accountNumber: String!, $bankCode: String!, $bankName: String) {
          getAccountName(id: $getAccountNameId, account_number: $accountNumber, bank_code: $bankCode, bank_name: $bankName) {
            first_name
            last_name
            middle_name

          }
}
  `;

  const testServer = new ApolloServer({
    schema,
  });
  const result = await testServer.executeOperation({
    query,
    variables: {
      accountNumber: "0055852601",
      bankCode: "044",
      getAccountNameId: "7fd8d46c-7225-4aff-91f2-94ae9c24a419",
      bankName: null,
    },
  });
  console.log({ result });
  // console.log({ data: result.body.singleResult });

  expect(result.body.kind === "single");
  expect(result.body).toBeTruthy();
});

test(" if user did not input account verify user by call to paystack", async () => {
  const query = `#graphql
    query Query($getAccountNameId: String!, $accountNumber: String!, $bankCode: String!, $bankName: String) {
          getAccountName(id: $getAccountNameId, account_number: $accountNumber, bank_code: $bankCode, bank_name: $bankName) {
            first_name
            last_name
            middle_name

          }
}
  `;

  const testServer = new ApolloServer({
    schema,
  });
  const result = await testServer.executeOperation({
    query,
    variables: {
      accountNumber: "0055852601",
      bankCode: "044",
      getAccountNameId: "7fd8d46c-7225-4aff-91f2-94ae9c24a419",
      bankName: "access-bank",
    },
  });
  console.log({ result });
  // console.log({ data: result.body.singleResult });

  expect(result.body.kind === "single");
  expect(result.body).toBeTruthy();
});
/**
 * 
 * const server = new ApolloServer(config);
 * 
 const response = await testServer.executeOperation({
    query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
    variables: { name: 'world' },
  });
  
const result = await server.executeOperation({
  query: GET_USER,
  variables: { id: 1 }
});
expect(result.errors).toBeUndefined();
expect(result.data?.user.name).toBe('Ida');
 */
// test("calls Paystack API if user did not input account name", async () = {
//   const query = `
//     query {
//       getAccountName(bankCode: "057", accountNumber: "0987654321") {
//         accountName
//       }a
//     }
//   `;
//   const context = {};
//   const variables = {};
//   const result = await graphql(schema, query, null, context, variables);

//   expect(result.errors).toBeUndefined();
//   expect(result.data.getAccountName.accountName).toBe("Jane Doe");
// });
