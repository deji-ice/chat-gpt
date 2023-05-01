import { Message } from '../../../typings'
import query from '../../../util/queryApi'
import { NextApiRequest, NextApiResponse } from 'next'
import { adminDB } from '../../../firebaseAdmin'
import admin from "firebase-admin"
import openai from '../../../util/chatgpt'

type Option = {
    label: string,
    value: string
}

type Data = {
    modelOptions: Option[]
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {



    const models = await openai.listModels().then((res) => res.data.data).catch(err => console.log(err.message))

    const modelOptions = models.map((model) => ({
        label: model.id,
        value: model.id
    }))


    res.status(200).json({ modelOptions });

} 