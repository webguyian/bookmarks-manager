import {
  collections,
  collection,
  createCollection,
  updateCollection,
  deleteCollection,
} from './collections'
import type { StandardScenario } from './collections.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('collections', () => {
  scenario('returns all collections', async (scenario: StandardScenario) => {
    const result = await collections()

    expect(result.length).toEqual(Object.keys(scenario.collection).length)
  })

  scenario(
    'returns a single collection',
    async (scenario: StandardScenario) => {
      const result = await collection({ id: scenario.collection.one.id })

      expect(result).toEqual(scenario.collection.one)
    }
  )

  scenario('creates a collection', async () => {
    const result = await createCollection({
      input: { userId: 'String', title: 'String' },
    })

    expect(result.userId).toEqual('String')
    expect(result.title).toEqual('String')
  })

  scenario('updates a collection', async (scenario: StandardScenario) => {
    const original = await collection({ id: scenario.collection.one.id })
    const result = await updateCollection({
      id: original.id,
      input: { userId: 'String2' },
    })

    expect(result.userId).toEqual('String2')
  })

  scenario('deletes a collection', async (scenario: StandardScenario) => {
    const original = await deleteCollection({ id: scenario.collection.one.id })
    const result = await collection({ id: original.id })

    expect(result).toEqual(null)
  })
})
