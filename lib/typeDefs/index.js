const { gql } = require('apollo-server-express');

module.exports = gql`
#=============================== INPUTS

input LoginInput {
  email: String!
  password: String!
}

input AddUserInput {
  name: String!
  email: String!
  password: String!
}

input AddMealInput {
  meal: MealInput
}

input MealInput {
  name: String!
  ingredients: [String!]!
  directions: String
  description: String
  # tags: [String]!
}

input UserIdInput {
  jwt: ID!
}

input UpdateFavoritesInput {
  id: ID!,
  isfav: Boolean!
}

# ============================= TYPES
  # type User {
  #   _id: ID!
  #   name: String!
  #   email: String!
  #   # plans: [Plan]!
  #   favorites: [Meal]!
  # }

  # type GroceryList {
  #   id: ID!
  #   name: String!
  #   owner: User!
  #   User: [User]!
  #   items: [String]!
  #   date_created: String!
  #   date_updated: String!
  # }

  type Meal {
    _id: ID!
    name: String!
    ingredients: [String!]!
    owner: User!
    description: String
    instructions: String
    date_created: String!
    date_updated: String!
    last_date_used: String
    # tags: [Tag]!
  }

  # type Tag {
  #   id: ID!
  #   tag: String!
  #   meals: [Meal!]!
  # }

  # type Plan {
  #   id: ID!
  #   name: String!
  #   owner: User!
  #   User: [User]!
  #   meals: [Meal]!
  # }

  type User {
    name: String!
    email: String!
    favorites: [Meal]!
    jwt: ID!
  }

  # type UserMeal {
  #   user: User
  #   meal: Meal
  # }
 # ========================================== Queries & Mutations
  type Query {
    getUserMeals: [Meal]
    getFourRecentMeals: [Meal]
  }

  type Mutation {
    login(input: LoginInput): User!
    addUser(input: AddUserInput): User
    addMeal(input: AddMealInput): Meal
    updateFavorites(input: UpdateFavoritesInput): User!
  }
`;
