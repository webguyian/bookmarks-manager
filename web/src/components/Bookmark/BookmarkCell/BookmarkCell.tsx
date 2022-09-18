import type { FindBookmarkById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Bookmark from 'src/components/Bookmark/Bookmark'

export const QUERY = gql`
  query FindBookmarkById($id: Int!) {
    bookmark: bookmark(id: $id) {
      id
      createdAt
      updatedAt
      userId
      url
      title
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Bookmark not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ bookmark }: CellSuccessProps<FindBookmarkById>) => {
  return <Bookmark bookmark={bookmark} />
}
