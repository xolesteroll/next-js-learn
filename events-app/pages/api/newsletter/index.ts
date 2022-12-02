import {NextApiHandler} from "next";
import clientPromise from "../../../data/mongodb-init"
const handler: NextApiHandler = async (req, res) => {
    const {email} = req.query
    const client = await clientPromise
    // @ts-ignore
    const db = client.db("next-js")

    const newEmail = await db.collection("emails").insertOne({email})

    return res.status(200).json({message: "OK", registeredEmailId: newEmail})
}

export default handler