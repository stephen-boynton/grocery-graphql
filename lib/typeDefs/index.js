const { gql } = require('apollo-server-express');

module.exports = gql`
  type Users {
    id: ID!
    name: String!
    email: String!
    plans: [Plans]!
    favorites: [Meals]!
    error: Int
  }

  type Groceries {
    id: ID!
    name: String!
    owner: Users!
    users: [Users]!
    items: [String]!
    date_created: String!
    date_updated: String!
    error: Int
  }

  type Meals {
    id: ID!
    name: String!
    ingredients: [String!]!
    owner: Users!
    description: String
    date_created: String!
    date_updated: String!
    favorite: Boolean!
    tags: [String]!
    error: Int
  }

  type Tags {
    id: ID!
    tag: String!
    meals: [Meals!]!
    error: Int
  }

  type Plans {
    id: ID!
    name: String!
    owner: Users!
    users: [Users]!
    meals: [Meals]!
    error: Int
  }

  type Token {
    jwt: ID
    error: Int
  }

  type UserMeal {
    user: Users
    meal: Meals
    error: Int
  }

  type Query {
    groceries: [Groceries]!
    grocery(key: String value: String): Groceries 
    meals: [Meals]!
    meal(key: String value: String): Meals
    tags: [Tags]!
    tag(key: String value: String): Tags
    plans: [Plans]!
    plan(key: String value: String): Plans
  }

  type Mutation {
    addGrocery(name: String! items: [String!]!): Groceries
    addMeal(name: String! ingredients: [String!]! description: String favorite: Boolean tags: [String]): Meals
    addPlan(name: String! meals: [ID!]!): Plans
    login(name: String! password: String!): Token
    createUser(name: String! password: String! email: String!): Token
    updatePassword(name: String! oldPassword: String! newPassword: String!): Token
    favorite(meal: ID! user: ID!):
  }
`;
