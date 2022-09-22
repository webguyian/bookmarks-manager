import { useAuth } from '@redwoodjs/auth'
import { Form, FieldError, Label, Submit, UrlField } from '@redwoodjs/forms'

const BookmarkForm = (props) => {
  const { currentUser } = useAuth()

  const inputClass =
    'w-full rounded border-2 border-gray-200 py-3 pl-3 pr-20 text-sm'

  const onSubmit = ({ url }) => {
    const data = {
      url,
      userId: currentUser.id,
    }
    props.onSave(data, props?.bookmark?.id)
  }

  return (
    <Form
      className="relative mt-8 flex items-start"
      onSubmit={onSubmit}
      error={props.error}
    >
      <div className="flex-auto">
        <Label name="url" className="sr-only">
          URL
        </Label>

        <UrlField
          name="url"
          defaultValue={props.bookmark?.url}
          placeholder="https://add-website-url-here"
          className={inputClass}
          errorClassName={`${inputClass} border-red-600 outline-none`}
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" />
      </div>
      <Submit
        disabled={props.loading}
        className="absolute right-0 rounded border-2 border-emerald-600 bg-emerald-500 px-5 py-2.5 text-white transition-colors hover:bg-emerald-600 disabled:cursor-wait disabled:border-gray-300 disabled:bg-gray-300"
      >
        Save
      </Submit>
    </Form>
  )
}

export default BookmarkForm
