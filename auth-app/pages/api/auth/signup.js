import {connectToDatabase} from "../../../lib/db";
import {hash} from "bcrypt";

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return
    }

    const userData = req.body
    const {email, password} = userData

    if (!email || !email.includes("@") || !password || password.trim().length < 7) {
        return res.status(422).json({message: "Provided data validation failed"})
    }

    const client = await connectToDatabase()
    const db = client.db('next-js')
    const existingUser = await db.collection('users').findOne({email})
    if (existingUser) return res.status(422).json({message: "User already exists"})

    const hashedPassword = await hashPassword(password)
    const newUser = await db.collection('users').insertOne({
        email,
        password: hashedPassword
    })
    const allUsers = await db.collection('users').find().toArray()

    return res.status(201).json({message: 'User Created', users: JSON.parse(JSON.stringify(allUsers))})
}

export default handler