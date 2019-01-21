const { ApolloServer, MockList } = require("apollo-server");
const faker = require("faker");

const typeDefs = `
    type Cat {
        id: ID!
        name: String!
        age: Int!
        rating: Float!
        nice: Boolean!
        description: String!
    }

    type Query {
        allCats: [Cat!]!
    }
`;

const resolvers = {
  Cat: {
    name: () => "Jungle"
  }
};

let catDescriptions = ["round", "honorable", "street smart"];

const mocks = {
  Query: () => ({
    allCats: () => new MockList(4)
  }),
  Cat: () => ({
    description: () => faker.random.arrayElement(catDescriptions)
  }),
  ID: () => faker.random.uuid(),
  Int: () => faker.random.number({ min: 1, max: 25 }),
  String: () => faker.name.firstName(),
  Float: () => faker.finance.amount(1, 100, 2),
  Boolean: () => faker.random.boolean()
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false
});

server.listen().then(console.log("Server running on port 4000"));
