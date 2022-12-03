import {NextApiHandler} from "next";
import client from "../../../data/mongodb-init";

const handler: NextApiHandler = async (req, res) => {
    const {commentEventId} = req.query
    const mongoClient = await client.connect()
    const db = mongoClient.db("next-js")

    if (req.method === 'POST') {
        const {email, name, text} = req.body

        if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "" ) {
            return res.status(422).json({message: "Please check entered data"})
        }

        const newComment = await db.collection("comments").insertOne({eventId: commentEventId, email, name, text})
        await mongoClient.close()
        return res.status(200).json({message: "OK", newComment})
    }

    if (req.method === 'GET') {
        const eventComments = await db.collection("comments").find({"eventId": commentEventId}).sort({_id: -1}).toArray()
        await mongoClient.close()

        if (eventComments) {
            return res.status(200).json({message: "OK", eventComments})
        } else {
            return res.status(404).json({message: "No comments where found fot this event"})
        }
    }

}

export default handler