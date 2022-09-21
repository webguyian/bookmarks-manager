import type {
  QueryResolvers,
  MutationResolvers,
  CollectionResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const collections: QueryResolvers['collections'] = () => {
  return db.collection.findMany()
}

export const collection: QueryResolvers['collection'] = ({ id }) => {
  return db.collection.findUnique({
    where: { id },
  })
}

export const createCollection: MutationResolvers['createCollection'] = ({
  input,
}) => {
  return db.collection.create({
    data: input,
  })
}

export const updateCollection: MutationResolvers['updateCollection'] = ({
  id,
  input,
}) => {
  return db.collection.update({
    data: input,
    where: { id },
  })
}

export const deleteCollection: MutationResolvers['deleteCollection'] = ({
  id,
}) => {
  return db.collection.delete({
    where: { id },
  })
}

export const Collection: CollectionResolvers = {
  bookmarks: (_obj, { root }) =>
    db.collection.findUnique({ where: { id: root.id } }).bookmarks(),
}
