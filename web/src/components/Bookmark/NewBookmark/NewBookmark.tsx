import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookmarkForm from 'src/components/Bookmark/BookmarkForm'

const CREATE_BOOKMARK_MUTATION = gql`
  mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
    createBookmark(input: $input) {
      id
    }
  }
`

const NewBookmark = () => {
  const [createBookmark, { loading, error }] = useMutation(CREATE_BOOKMARK_MUTATION, {
    onCompleted: () => {
      toast.success('Bookmark created')
      navigate(routes.bookmarks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createBookmark({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Bookmark</h2>
      </header>
      <div className="rw-segment-main">
        <BookmarkForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBookmark
