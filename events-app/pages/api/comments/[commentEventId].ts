import {NextApiHandler} from "next";
import clientPromise from "../../../data/mongodb-init";

const handler: NextApiHandler = async (req, res) => {
    const query = req.query
    const {commentEventId} = query
    const mongoClient = await clientPromise
    const db = mongoClient.db("next-js")

    if (req.method === 'POST') {
        const {email, name, text} = req.body
        const newComment = await db.collection("comments").insertOne({eventId: commentEventId, email, name, text})

        return res.status(200).json({message: "OK", newComment})
    }

    if (req.method === 'GET') {
        const eventComments = await db.collection("comments").find({"eventId": commentEventId}).toArray()
        if (eventComments) {
            return res.status(200).json({message: "OK", eventComments})
        } else {
            return res.status(404).json({message: "No comments where found fot this event"})
        }
    }
}

export default handler