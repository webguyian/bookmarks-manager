import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import BookmarkForm from 'src/components/Bookmark/BookmarkForm'

const CREATE_BOOKMARK_MUTATION = gql`
  mutation CreateBookmarkMutation($input: CreateBookmarkInput!) {
    createBookmark(input: $input) {
      id
    }
  }
`

const NewBookmark = () => {
  const [createBookmark, { loading, error }] = useMutation(
    CREATE_BOOKMARK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Bookmark created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createBookmark({ variables: { input } })
  }

  return (
    <div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-emerald-900 lg:text-6xl">
          Add a new bookmark
        </h1>
      </header>
      <BookmarkForm onSave={onSave} loading={loading} error={error} />
    </div>
  )
}

export default NewBookmark
