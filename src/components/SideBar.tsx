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
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const SideBar = () => {
  const { data: session } = useSession();
  const [engine, setEngine] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className=" text-white flex flex-col p-2 h-screen text-sm relative z-0 ">
      <div className="flex-1">
        <div className="overflow-y-auto relative">
          <NewChat />
          <div className="hidden sm:inline ">
            <ModelSelection />
          </div>
          {/* map through chat rows */}
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <p className="animate-pulse text-center text-white">
                Loading Chats...
              </p>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        //create logout? pop up modal
        <div className="relative">
        <div
          className="px-5 py-3 flex flex-col md:flex-row items-center bg-gray-700 max-w-[4rem] md:min-w-[18.5rem] overflow-hidden
    hover:bg-gray-700/70 space-x-2 cursor-pointer text-gray-300 z-1 fixed
    transition-all duration-200 ease-out bottom-0 "
          onClick={handleOpen}
        >
          <Image
            className="rounded-full"
            width={30}
            height={30}
            src={session.user?.image!}
            alt="profile"
          />
          <p className="text-sm md:text-md">{session.user?.name!}</p>
        </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center text-xl space-y-5">
          <p className="" id="modal-modal-title">
            Logout?
          </p>
          <div className="space-x-5 flex items-center justify-center">
            <button
              onClick={handleClose}
              className="relative inline-block text-lg group"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-green-600 group-hover:-rotate-180 ease"></span>
                <span className="relative">Cancel</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
            <button
              onClick={() => signOut()}
              className="relative inline-block text-lg group"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-red-600 group-hover:-rotate-180 ease"></span>
                <span className="relative">Log Out</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SideBar;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  marginLeft:"1rem",
  margiRight:"1rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
