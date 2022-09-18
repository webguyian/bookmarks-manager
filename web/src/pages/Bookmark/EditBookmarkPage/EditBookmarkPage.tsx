import EditBookmarkCell from 'src/components/Bookmark/EditBookmarkCell'

type BookmarkPageProps = {
  id: number
}

const EditBookmarkPage = ({ id }: BookmarkPageProps) => {
  return <EditBookmarkCell id={id} />
}

export default EditBookmarkPage
