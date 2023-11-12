'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EditForm from './EditForm'
import CreateForm from './CreateForm'
import Button from './button'
import TemplatesList from './TemplatesList'
import PreviewTemplate from './PreviewTemplate'

export default function Templates({ data }) {
  const [template, setTemplate] = useState(null)
  const [createTemplate, setCreateTemplate] = useState(null)
  const [editTemplate, setEditTemplate] = useState(null)
  const router = useRouter()

  function openCreateForm() {
    setTemplate(null)
    setCreateTemplate(true)
  }
  function openEditForm(id) {
    setCreateTemplate(null)
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
    }
    fetch('http://localhost:3000/api/templates', {
      method: 'POST',
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then(() => {
        router.refresh()
      })

    setCreateTemplate(null)
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
    setCreateTemplate(null)
  }

  return (
    <div className='flex flex-col items-center sm:flex-row'>
      <ol className='flex flex-col mr-4 space-y-2'>
        <h1 className='text-3xl font-bold pb-4 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent'>
          Templates
        </h1>
        <Button
          style='p-2 text-blue-500 border border-blue-500 rounded-lg mb-2'
          action={() => openCreateForm()}
          title='Create Template'
        />
        {createTemplate && (
          <CreateForm
            createTemplate={createTemplate}
            setCreateTemplate={setCreateTemplate}
            handleCreate={handleCreate}
          />
        )}
        <TemplatesList
          data={data}
          handleDelete={handleDelete}
          openEditForm={openEditForm}
        />
      </ol>
      {template && (
        <div className='flex flex-col items-center border p-6 w-80 sm:w-96 bg-gray-100 rounded-lg'>
          <div className='flex flex-row justify-between w-full'>
            {!editTemplate && (
              <Button
                style='p-2 text-blue-500 border border-blue-500 rounded-lg'
                action={() => setEditTemplate(template)}
                title='Edit'
              />
            )}
            <Button
              style='text-red-500 ml-auto'
              action={handleCancel}
              title='X'
            />
          </div>
          {editTemplate && (
            <EditForm
              editTemplate={editTemplate}
              setEditTemplate={setEditTemplate}
              handleSubmit={handleSubmit}
            />
          )}
          {!editTemplate && <PreviewTemplate template={template} />}
        </div>
      )}
    </div>
  )
}
