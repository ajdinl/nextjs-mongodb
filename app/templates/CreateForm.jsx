import Button from './button'

export default function CreateForm({
  createTemplate,
  setCreateTemplate,
  handleCreate,
}) {
  return (
    <form
      className='flex flex-col bg-gray-100 text-black w-full p-4 rounded-lg'
      onSubmit={(e) => handleCreate(createTemplate)}
    >
      <Button
        style='text-red-500 ml-auto pb-2'
        action={() => setCreateTemplate(null)}
        title='X'
      />
      <input
        type='text'
        name='name'
        value={createTemplate.name || ''}
        onChange={(e) =>
          setCreateTemplate({
            ...createTemplate,
            name: e.target.value,
          })
        }
        required
        minLength={5}
        maxLength={40}
        className='p-2 rounded-lg mb-2'
        placeholder='Write template title here...'
      />
      <input
        type='text'
        name='subject'
        value={createTemplate.subject || ''}
        onChange={(e) =>
          setCreateTemplate({
            ...createTemplate,
            subject: e.target.value,
          })
        }
        required
        minLength={5}
        maxLength={50}
        className='p-2 rounded-lg mb-2'
        placeholder='Write template subject here...'
      />
      <textarea
        type='text'
        name='body'
        value={createTemplate.body || ''}
        onChange={(e) =>
          setCreateTemplate({
            ...createTemplate,
            body: e.target.value,
          })
        }
        required
        minLength={10}
        className='p-2 rounded-lg mb-2 resize-none'
        placeholder='Write template body here...'
      />
      <Button
        style='p-2 text-blue-500 border border-blue-500 rounded-lg'
        type='submit'
        title='Create'
      />
    </form>
  )
}
