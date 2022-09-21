import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CollectionCreateArgs>({
  collection: {
    one: { data: { userId: 'String', title: 'String' } },
    two: { data: { userId: 'String', title: 'String' } },
  },
})

export type StandardScenario = typeof standard
