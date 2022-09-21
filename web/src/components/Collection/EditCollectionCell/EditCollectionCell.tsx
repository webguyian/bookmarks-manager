import type { EditCollectionById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CollectionForm from 'src/components/Collection/CollectionForm'

export const QUERY = gql`
  query EditCollectionById($id: Int!) {
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
const UPDATE_COLLECTION_MUTATION = gql`
  mutation UpdateCollectionMutation($id: Int!, $input: UpdateCollectionInput!) {
    updateCollection(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ collection }: CellSuccessProps<EditCollectionById>) => {
  const [updateCollection, { loading, error }] = useMutation(UPDATE_COLLECTION_MUTATION, {
    onCompleted: () => {
      toast.success('Collection updated')
      navigate(routes.collections())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateCollection({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Collection {collection.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CollectionForm collection={collection} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
