import {NextApiHandler} from "next";
import clientPromise from "../../../data/mongodb-init"
const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const {email} = req.body
        if (!email || !email.includes("@")) {
            return res.status(422).json({message: "Invalid or wrong data provided"})
        }
        const client = await clientPromise
        // @ts-ignore
        const db = client.db("next-js")
        const newEmail = await db.collection("emails").insertOne({email})

        return res.status(200).json({message: "OK", registeredEmailId: newEmail})
    } else {
        return res.status(400).json({message: "Bad request"})
    }

}

export default handler