import { useAuth } from '@redwoodjs/auth'

import BookmarksCell from 'src/components/Bookmark/BookmarksCell'

const BookmarksPage = () => {
  const { currentUser } = useAuth()

  return <BookmarksCell userId={currentUser.id} />
}

export default BookmarksPage
