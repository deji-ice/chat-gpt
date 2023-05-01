"use client";


import { Message } from "typings";
import toast, { Toaster } from 'react-hot-toast';
import {
  ArrowRightCircleIcon,
  ArrowRightOnRectangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { db } from "../../firebase";
import ModelSelection from "./ModelSelection";
import useSWR  from "swr";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession(); //check

  //useSWR to get model
  const {data:model} = useSWR("model", {
    fallbackData:"text-davinci-003"
})

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    if (!prompt) return;
 
    const data = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: data,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avi:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    console.log(message);

    //adds to prompt text to firestore
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //toast notfication

    const notification = toast.loading(`ChatGPT is thinkin'...`)

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data,
        chatId,
        model,
        session,
      }),
    })
      .then((res) => {
        console.log(res, "sent to askquestion api");
        toast.success(`ChatGPT has responded`, {
          id: notification
        })
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="text-gray-400 rounded-lg bg-gray-700/50  text-sm">
      <form onSubmit={sendMessage} className="flex p-5 space-x-5 ">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type="text"
          placeholder="type your message..."
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="items-center bg-[#11a47f] hover:opacity-50 px-4 py-2 rounded 
            disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed text-white"
        >
          <PaperAirplaneIcon className="w-10 h-5 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
};

export default ChatInput;
