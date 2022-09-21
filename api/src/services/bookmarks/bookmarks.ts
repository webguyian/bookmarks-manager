import getMetadata from 'metadata-scraper'
import { chromium } from 'playwright'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const captureScreenshot = async (url: string) => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto(url)
  const screenshot = await page.screenshot()
  await browser.close()

  return screenshot
}

export const bookmarks: QueryResolvers['bookmarks'] = ({ userId }) => {
  return db.bookmark.findMany({
    where: { userId },
  })
}

export const bookmark: QueryResolvers['bookmark'] = async ({ id }) => {
  const match = await db.bookmark.findUnique({
    where: { id },
  })

  return {
    ...match,
    screenshot: match.screenshot
      ? `data:image/png;base64,${match.screenshot.toString('base64')}`
      : '',
  }
}

export const createBookmark: MutationResolvers['createBookmark'] = async ({
  input,
}) => {
  const { url } = input
  const metadata = await getMetadata(url)
  const screenshot = await captureScreenshot(url)
  const data = {
    ...input,
    title: metadata.title,
    description: metadata.description,
    screenshot,
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
  const screenshot = await captureScreenshot(url)

  const data = {
    ...input,
    title: metadata.title,
    description: metadata.description,
    screenshot,
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
