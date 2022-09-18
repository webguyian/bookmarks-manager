import humanize from 'humanize-string'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Bookmark/BookmarksCell'

const DELETE_BOOKMARK_MUTATION = gql`
  mutation DeleteBookmarkMutation($id: Int!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const BookmarksList = ({ bookmarks }) => {
  const { currentUser } = useAuth()

  const [deleteBookmark] = useMutation(DELETE_BOOKMARK_MUTATION, {
    onCompleted: () => {
      toast.success('Bookmark deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY, variables: { userId: currentUser.id } }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bookmark ' + id + '?')) {
      deleteBookmark({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Title</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.map((bookmark) => (
            <tr key={bookmark.id}>
              <td>{truncate(bookmark.id)}</td>
              <td>{truncate(bookmark.url)}</td>
              <td>{truncate(bookmark.title)}</td>
              <td>{truncate(bookmark.description)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.bookmark({ id: bookmark.id })}
                    title={'Show bookmark ' + bookmark.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBookmark({ id: bookmark.id })}
                    title={'Edit bookmark ' + bookmark.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete bookmark ' + bookmark.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bookmark.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookmarksList
