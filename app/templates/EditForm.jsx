import Button from './button'

export default function EditForm({
  editTemplate,
  setEditTemplate,
  handleSubmit,
}) {
  return (
    <form
      className='flex flex-col bg-gray-100 text-black w-full mt-8 p-4 ml-auto'
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type='text'
        name='name'
        value={editTemplate.name}
        onChange={(e) =>
          setEditTemplate({ ...editTemplate, name: e.target.value })
        }
        className='p-2 rounded-lg mb-2'
        placeholder='Write template title here...'
        required
        minLength={5}
        maxLength={40}
      />
      <input
        type='text'
        name='subject'
        value={editTemplate.subject}
        onChange={(e) =>
          setEditTemplate({
            ...editTemplate,
            subject: e.target.value,
          })
        }
        className='p-2 rounded-lg mb-2'
        placeholder='Write template subject here...'
        required
        minLength={5}
        maxLength={50}
      />
      <textarea
        type='text'
        name='body'
        value={editTemplate.body}
        onChange={(e) =>
          setEditTemplate({ ...editTemplate, body: e.target.value })
        }
        className='p-2 rounded-lg mb-2 h-40 resize-none'
        placeholder='Write your template here...'
        required
        minLength={10}
      />
      <Button
        style='p-2 text-blue-500 border border-blue-500 rounded-lg'
        title='Save'
        type='submit'
      />
    </form>
  )
}
