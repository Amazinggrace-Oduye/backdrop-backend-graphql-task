import { ApolloServer } from "@apollo/server";

import { schema } from "../src/users/schema";

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
  // console.log({ data: result.body.singleResult });

  expect(result.body.kind === "single");
  expect(result.body).toBeTruthy();
});
