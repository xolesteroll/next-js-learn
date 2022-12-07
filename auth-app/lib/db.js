import {MongoClient} from "mongodb"

export const connectToDatabase = async () => {
    const client = new MongoClient(process.env.mongo_url)
    return await client.connect()
}