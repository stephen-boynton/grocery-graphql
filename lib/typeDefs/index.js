const { gql } = require('apollo-server');

module.exports = gql`
  type Groceries {
    _id: ID!
    name: String!
    items: [String]!
    date_created: String!
    date_updated: String!
  }

  type Meals {
    _id: ID!
    name: String!
    ingredients: [String]!
    description: String
    date_created: String!
    date_updated: String!
    favorite: Boolean!
    tags: [String]!
  }

  type Tags {
    _id: ID!
    tag: String!
    meals: [ID]
  }

  type Query {
    groceries: [Groceries]
    grocery(key: String value: String): Groceries 
    meals: [Meals]
  }
`