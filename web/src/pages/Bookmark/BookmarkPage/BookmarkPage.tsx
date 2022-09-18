import BookmarkCell from 'src/components/Bookmark/BookmarkCell'

type BookmarkPageProps = {
  id: number
}

const BookmarkPage = ({ id }: BookmarkPageProps) => {
  return <BookmarkCell id={id} />
}

export default BookmarkPage
