import getMetadata from 'metadata-scraper'
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

export const createBookmark: MutationResolvers['createBookmark'] = async ({
  input,
}) => {
  const { url } = input
  const metadata = await getMetadata(url)
  const data = {
    ...input,
    title: metadata.title,
    description: metadata.description,
  }

  return db.bookmark.create({
    data,
  })
}

export const updateBookmark: MutationResolvers['updateBookmark'] = async ({
  id,
  input,
}) => {
  const { url } = input
  const metadata = await getMetadata(url)
  const data = {
    ...input,
    title: metadata.title,
    description: metadata.description,
  }

  return db.bookmark.update({
    data,
    where: { id },
  })
}

export const deleteBookmark: MutationResolvers['deleteBookmark'] = ({ id }) => {
  return db.bookmark.delete({
    where: { id },
  })
}
