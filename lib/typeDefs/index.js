const { gql } = require('apollo-server');

module.exports = gql`
  type Groceries {
    id: ID!
    name: String!
    items: [String]!
    date_created: String!
    date_updated: String!
  }

  type Meals {
    id: ID!
    name: String!
    ingredients: [String]!
    description: String
    date_created: String!
    date_updated: String!
    favorite: Boolean!
    tags: [String]!
  }

  type Tags {
    id: ID!
    tag: String!
    meals: [Meals]
  }

  type Plans {
    id: ID!
    name: String!
    meals: [Meals]
  }

  type Query {
    groceries: [Groceries]
    grocery(key: String value: String): Groceries 
    meals: [Meals]
    meal(key: String value: String): Meals
    tags: [Tags]
    tag(key: String value: String): Tags
    plans: [Plans]
    plan(key: String value: String): Plans

  }

  type Mutation {
    groceries(name: String! items: [String!]!): Groceries
    meals(name: String! ingredients: [String!]! description: String favorite: Boolean tags: [String]): Meals
    plans(name: String! meals: [ID!]!): Plans
  }
`