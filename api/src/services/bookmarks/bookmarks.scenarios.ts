import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BookmarkCreateArgs>({
  bookmark: {
    one: { data: { userId: 'String', url: 'String' } },
    two: { data: { userId: 'String', url: 'String' } },
  },
})

export type StandardScenario = typeof standard
