import type { FindCollectionById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Collection from 'src/components/Collection/Collection'

export const QUERY = gql`
  query FindCollectionById($id: Int!) {
    collection: collection(id: $id) {
      id
      createdAt
      updatedAt
      userId
      title
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Collection not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ collection }: CellSuccessProps<FindCollectionById>) => {
  return <Collection collection={collection} />
}
