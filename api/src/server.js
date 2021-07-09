const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { addResolversToSchema } = require('@graphql-tools/schema')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const path = require('path')
const resolvers = require('./resolvers')

const schema = loadSchemaSync(path.join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({ schema: schemaWithResolvers, graphiql: true })
)
app.listen(4000)

console.log('Running a GraphQL API server at http://localhost:4000/graphql')
