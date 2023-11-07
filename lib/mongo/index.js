import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const options = {}

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let client = new MongoClient(MONGODB_URI, options)
let clientPromise

if (!process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise
