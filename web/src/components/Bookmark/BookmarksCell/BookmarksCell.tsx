import type { FindBookmarks } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Bookmarks from 'src/components/Bookmark/Bookmarks'

export const QUERY = gql`
  query FindBookmarks {
    bookmarks {
      id
      createdAt
      updatedAt
      userId
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookmarks yet. '}
      <Link
        to={routes.newBookmark()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ bookmarks }: CellSuccessProps<FindBookmarks>) => {
  return <Bookmarks bookmarks={bookmarks} />
}
