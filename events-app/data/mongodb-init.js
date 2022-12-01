import {MongoClient} from 'mongodb'

if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local')
}
const uri = process.env.MONGODB_URI
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

const client = new MongoClient(uri, options)
const clientPromise = client.connect()

export default clientPromise