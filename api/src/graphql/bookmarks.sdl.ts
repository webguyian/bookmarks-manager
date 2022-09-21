export const schema = gql`
  type Bookmark {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    url: String!
    title: String
    description: String
    screenshot: String
  }

  type Query {
    bookmarks(userId: String!): [Bookmark!]! @requireAuth
    bookmark(id: Int!): Bookmark @requireAuth
  }

  input CreateBookmarkInput {
    userId: String!
    url: String!
  }

  input UpdateBookmarkInput {
    userId: String
    url: String
  }

  type Mutation {
    createBookmark(input: CreateBookmarkInput!): Bookmark! @requireAuth
    updateBookmark(id: Int!, input: UpdateBookmarkInput!): Bookmark!
      @requireAuth
    deleteBookmark(id: Int!): Bookmark! @requireAuth
  }
`
