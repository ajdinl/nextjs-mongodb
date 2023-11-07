import ClientPromise from '@lib/mongo'
import { ObjectId } from 'mongodb'

let client
let db
let templates

async function init() {
  if (db) return
  try {
    client = await ClientPromise
    db = client.db()
    templates = db.collection(process.env.MONGODB_COLLECTION)
  } catch (e) {
    throw new Error('Could not connect to database')
  }
}

;(async () => {
  await init()
})()

export async function getTemplates() {
  try {
    if (!templates) await init()
    const result = await templates.find({}).toArray()

    return result
  } catch (e) {
    return {
      error: 'Failed to get templates',
    }
  }
}

export async function getTemplate(id) {
  try {
    if (!templates) await init()
    const result = await templates.findOne({ _id: new ObjectId(id) })

    return result
  } catch (e) {
    return {
      error: 'Failed to get template',
    }
  }
}

export async function createTemplate(data) {
  try {
    if (!templates) await init()
    const result = await templates.insertOne(data)

    return result
  } catch (e) {
    return {
      error: 'Failed to create template',
    }
  }
}

export async function updateTemplate(id, data) {
  const { _id, ...updateData } = data

  if (_id) {
    delete updateData._id
    return updateTemplate(id, updateData)
  }
  try {
    if (!templates) await init()
    const result = await templates.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    )
    return result
  } catch (e) {
    return {
      error: 'Failed to update template',
    }
  }
}

export async function deleteTemplate(id) {
  try {
    if (!templates) await init()
    const result = await templates.deleteOne({ _id: new ObjectId(id) })
    return result
  } catch (e) {
    return {
      error: 'Failed to delete template',
    }
  }
}
