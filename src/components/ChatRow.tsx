import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { db } from "../../firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const [active, setActive] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );
  const router = useRouter();
  
  const deleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  return (
    <Link
      href={`/chat/${id}`}
      className={`rounded-lg px-5 py-3 text-sm flex items-center justify-between
  hover:bg-gray-700/70 space-x-2 cursor-pointer text-gray-300 ${
    active ? "bg-gray-600/50" : ""
  }
  transition-all duration-200 ease-out`}
    >
      <div className="flex space-x-2">
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className=" flex-1 hidden md:inline-flex truncate">
          {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>
      </div>
      <TrashIcon onClick={deleteChat} className="h-5 w-5 hover:text-red-700" />
    </Link>
  );
};

export default ChatRow;
