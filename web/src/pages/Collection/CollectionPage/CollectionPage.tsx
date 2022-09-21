import CollectionCell from 'src/components/Collection/CollectionCell'

type CollectionPageProps = {
  id: number
}

const CollectionPage = ({ id }: CollectionPageProps) => {
  return <CollectionCell id={id} />
}

export default CollectionPage
