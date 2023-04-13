import { ApolloServer } from "@apollo/server";
import { schema } from "../src/graphql/schema";

test("returns account name input by user", async () => {
  const query = `#graphql
    query getAccountName(bank_code: String, account_number:String, id:Sting) {
        getAccountName(bank_code:$bank_code,account_number:$account_number,id:$id)
      }
  
  `;

  const testServer = new ApolloServer({
    schema,
  });
  const result = await testServer.executeOperation({
    query,
    variables: {
      bank_code: "044",
      account_number: "0055852601",
      id: "7fd8d46c-7225-4aff-91f2-94ae9c24a419",
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
