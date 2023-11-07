'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TemplatesList({ data }) {
  const [template, setTemplate] = useState(null)
  const [templateForm, setTemplateForm] = useState(null)
  const [editTemplate, setEditTemplate] = useState(null)
  const router = useRouter()

  function handleView(id) {
    fetch(`http://localhost:3000/api/templates?_id=${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setTemplate(data)
      })
  }

  function handleCreate(data) {
    const updateData = {
      ...data,
      user: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    }
    fetch('http://localhost:3000/api/templates', {
      method: 'POST',
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then(() => {
        router.refresh()
      })

    setTemplateForm(null)
  }

  function handleEdit(data) {
    fetch(`http://localhost:3000/api/templates?_id=${template._id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        router.refresh()
      })
  }

  function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this template?')) return
    fetch(`http://localhost:3000/api/templates?_id=${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        handleCancel()
        router.refresh()
      })
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleEdit(editTemplate)
    setTemplate(editTemplate)
    setEditTemplate(null)
  }

  function handleCancel() {
    setEditTemplate(null)
    setTemplate(null)
    setTemplateForm(null)
  }

  return (
    <div className='flex flex-col items-center sm:flex-row'>
      <ol className='flex flex-col p-4'>
        <h1 className='text-3xl font-bold pb-4'>Templates</h1>
        <button
          className='p-2 text-blue-500 border border-blue-500 rounded-lg'
          onClick={() => setTemplateForm({ name: '', subject: '', body: '' })}
        >
          Create Template
        </button>
        {templateForm && (
          <form
            className='flex flex-col bg-gray-100 text-black w-full mt-8 p-4'
            onSubmit={(e) => handleCreate(templateForm)}
          >
            <input
              type='text'
              name='name'
              value={templateForm.name}
              onChange={(e) =>
                setTemplateForm({
                  ...templateForm,
                  name: e.target.value,
                })
              }
              className='p-2 rounded-lg mb-2'
              placeholder='Write template title here...'
            />
            <input
              type='text'
              name='subject'
              value={templateForm.subject}
              onChange={(e) =>
                setTemplateForm({
                  ...templateForm,
                  subject: e.target.value,
                })
              }
              className='p-2 rounded-lg mb-2'
              placeholder='Write template subject here...'
            />
            <textarea
              type='text'
              name='body'
              value={templateForm.body}
              onChange={(e) =>
                setTemplateForm({
                  ...templateForm,
                  body: e.target.value,
                })
              }
              className='p-2 rounded-lg mb-2'
              placeholder='Write template body here...'
            />
            <button
              className='p-2 text-blue-500 border border-blue-500 rounded-lg'
              type='submit'
            >
              Create
            </button>
          </form>
        )}
        {data.map((item) => (
          <li className='pl-2 cursor-pointer' key={item._id}>
            <div>
              <span onClick={() => handleView(item._id)}>{item.name}</span>
              <button
                className='p-2 text-red-500'
                onClick={() => handleDelete(item._id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ol>
      {template && (
        <div className='flex flex-col items-center border p-6 w-80 sm:w-96 bg-gray-100 rounded-lg'>
          <div className='flex flex-row justify-between w-full'>
            {!editTemplate && (
              <button
                className='p-2 text-blue-500 border border-blue-500 rounded-lg'
                onClick={() => setEditTemplate(template)}
              >
                Edit
              </button>
            )}
            <button
              className='p-2 text-red-500 ml-auto'
              onClick={() => handleCancel()}
            >
              X
            </button>
          </div>
          {editTemplate && (
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
              />
              <button
                className='p-2 text-blue-500 border border-blue-500 rounded-lg'
                type='submit'
              >
                Save
              </button>
            </form>
          )}
          {!editTemplate && (
            <div className='flex flex-col items-center text-center p-10'>
              <span className='text-xl p-2 text-black'>{template.name}</span>
              <span className='text-md text-black'>{template.subject}</span>
              <span className='text-md p-4 text-black'>{template.body}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
