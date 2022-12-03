import {MongoClient} from 'mongodb'

if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local')
}
const uri = process.env.MONGODB_URI
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

// @ts-ignore
const client = new MongoClient(uri, options)

export default client