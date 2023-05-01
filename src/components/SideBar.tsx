"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  DocumentReference,
  collection,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import ChatRow from "./ChatRow";
import { useEffect, useState } from "react";
import ModelSelection from "./ModelSelection";

const SideBar = () => {
  const { data: session } = useSession();
  const [engine, setEngine] = useState(null);

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className=" text-white flex flex-col p-2 h-screen text-sm relative">
      <div className="flex-1">
        <div className="overflow-y-auto">
          <NewChat />
          <div className="hidden sm:inline ">
            <ModelSelection />
          </div>
          {/* map through chat rows */}
          <div className="flex flex-col space-y-2 my-2">
            {loading && 
              <p className="animate-pulse text-center text-white">Loading Chats...</p>
            }
            { 
              chats?.docs.map((chat) => <ChatRow key={chat.id} id={chat.id} />)
            }
          </div>
        </div>
      </div>
      {session && (
        //create logout? pop up modal
        <div
          className="px-5 py-3 text-sm flex items-center bg-gray-700 max-w-[5rem] md:min-w-[18.5rem] overflow-hidden
    hover:bg-gray-700/70 space-x-2 cursor-pointer text-gray-300
    // eslint-disable-next-line @next/next/no-img-element
    transition-all duration-200 ease-out fixed bottom-0 "
          onClick={() => signOut()}
        >
          <img
            className="rounded-full"
            width={30}
            height={30}
            src={session.user?.image!}
            alt="profile"
          />
          <p>{session.user?.name!}</p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
