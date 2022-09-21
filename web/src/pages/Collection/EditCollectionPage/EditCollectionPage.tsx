import EditCollectionCell from 'src/components/Collection/EditCollectionCell'

type CollectionPageProps = {
  id: number
}

const EditCollectionPage = ({ id }: CollectionPageProps) => {
  return <EditCollectionCell id={id} />
}

export default EditCollectionPage
