import {NextApiHandler} from "next";
import dbAdmin from "../../../data/firebase-init"
const admin = require("firebase-admin");


const handler: NextApiHandler = async (req, res) => {
    const db = admin.database()
    const dbRef = db.ref('https://client-fetch-next-default-rtdb.europe-west1.firebasedatabase.app/')
    const emailsRef = dbRef.child('emails')
    await emailsRef.set({
        email1: 'someemail'
    })

    res.status(200).json({message: "OK"})
}

export default handler