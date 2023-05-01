import { Message } from '../../../typings'
import query from '../../../util/queryApi'
import { NextApiRequest, NextApiResponse } from 'next'
import { adminDB } from '../../../firebaseAdmin'
import admin from "firebase-admin"

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {


    const { prompt, chatId, model, session } = req.body

    if (!prompt) {
        res.status(400).json({ answer: "PLease provide a prompt" });
        return;
    }

    if (!chatId) {
        res.status(400).json({ answer: "PLease provide a valid chat ID!" });
        return;
    }


    //chatGPT query
    const response = await query(prompt, chatId, model)

    const message: Message = {
        text: response!,
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avi: "https://gravatar.com/avatar/6748fc86d1e90dba69f47abccf7df1bb?s=400&d=robohash&r=x"

        }
    }
 
    await adminDB
        .collection("users")
        .doc(session?.user?.email!)
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .add(message);

    res.status(200).json({ answer: message.text });

} 