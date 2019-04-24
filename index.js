require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const { Pool } = require('pg');
const { makeSchemaAndPlugin } = require("postgraphile-apollo-server");
const pool = new Pool({ connectionString: process.env.POSTGRES_STRING });

async function main() {
  const { schema, plugin } = await makeSchemaAndPlugin(
    pool,
    'public',
    {
      graphqlRoute: '/graphql'
    }
  )
  const server = new ApolloServer({
    schema,
    plugins: [plugin]
  });

  const { url } = await server.listen()
  console.log(`Apollo Server is ready at ${url}`);
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});