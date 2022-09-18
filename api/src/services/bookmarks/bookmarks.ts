import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const bookmarks: QueryResolvers['bookmarks'] = ({ userId }) => {
  return db.bookmark.findMany({
    where: { userId },
  })
}

export const bookmark: QueryResolvers['bookmark'] = ({ id }) => {
  return db.bookmark.findUnique({
    where: { id },
  })
}

export const createBookmark: MutationResolvers['createBookmark'] = ({
  input,
}) => {
  return db.bookmark.create({
    data: input,
  })
}

export const updateBookmark: MutationResolvers['updateBookmark'] = ({
  id,
  input,
}) => {
  return db.bookmark.update({
    data: input,
    where: { id },
  })
}

export const deleteBookmark: MutationResolvers['deleteBookmark'] = ({ id }) => {
  return db.bookmark.delete({
    where: { id },
  })
}
