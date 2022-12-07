import {NextApiHandler} from "next";
import {MongoClient} from "mongodb";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body
        const {email, name, message} = data

        if (!email.includes("@") ||
            email.length < 5 ||
            name.length < 2 ||
            message.length < 5
        ) {
            return res.status(422).json({message: "Provided data is invalid."})
        } else {
            let client
            try {
                const databaseURL = process.env.mongodb_url

                if (!databaseURL) throw new Error("Database connection error")

                client = new MongoClient(databaseURL)
                await client.connect((err) => {
                    if (err) throw new Error("Database connection error")
                })
                const dbName = process.env.environment === "development" ? "blog" : "blog-prod"
                const db = client.db(dbName)
                const existingEmail = await db.collection("feedback").findOne({email})

                if (existingEmail) return res.status(422).json({message: "I already have a message from you, and will respond ASAP"})

                const newFeedback = await db.collection("feedback").insertOne(data)

                return res.status(200).json({message: "We've received your message, thank you!", feedback: newFeedback})
            } catch (e: any) {
                return res.status(403).json({message: "Something went wrong, please try again."})
            } finally {
                client?.close()
            }
        }
    } else {
        return res.status(405).json({message: `${req.method} request method is not allowed on this route.`})
    }
}

export default handler