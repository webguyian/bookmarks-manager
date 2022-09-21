import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CollectionForm from 'src/components/Collection/CollectionForm'

const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollectionMutation($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      id
    }
  }
`

const NewCollection = () => {
  const [createCollection, { loading, error }] = useMutation(CREATE_COLLECTION_MUTATION, {
    onCompleted: () => {
      toast.success('Collection created')
      navigate(routes.collections())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createCollection({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Collection</h2>
      </header>
      <div className="rw-segment-main">
        <CollectionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCollection
