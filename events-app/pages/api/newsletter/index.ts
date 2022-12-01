import {NextApiHandler} from "next";
import clientPromise from "../../../data/mongodb-init"

const handler: NextApiHandler = async (req, res) => {
    const client = await clientPromise
    const db = client.db("next-js")
    const requestData = req.body
    console.log(requestData)

    const email = await db.collection("emails").insertOne({email: requestData.email})
    res.status(200).json({message: "OK", registeredEmailId: email})
}

export default handler