export const schema = gql`
  type Collection {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    title: String!
    description: String
    bookmarks: [Bookmark]!
  }

  type Query {
    collections: [Collection!]! @requireAuth
    collection(id: Int!): Collection @requireAuth
  }

  input CreateCollectionInput {
    userId: String!
    title: String!
    description: String
  }

  input UpdateCollectionInput {
    userId: String
    title: String
    description: String
  }

  type Mutation {
    createCollection(input: CreateCollectionInput!): Collection! @requireAuth
    updateCollection(id: Int!, input: UpdateCollectionInput!): Collection!
      @requireAuth
    deleteCollection(id: Int!): Collection! @requireAuth
  }
`
