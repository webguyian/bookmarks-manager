import type { FindCollections } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Collections from 'src/components/Collection/Collections'

export const QUERY = gql`
  query FindCollections {
    collections {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No collections yet. '}
      <Link
        to={routes.newCollection()}
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

export const Success = ({ collections }: CellSuccessProps<FindCollections>) => {
  return <Collections collections={collections} />
}
