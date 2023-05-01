"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center ">
      <Image
        src={"https:/links.papareact.com/2i6"}
        width={300}
        height={300}
        alt="logo"
      />
      <button className="text-white font-bold text-3xl animate-pulse" onClick={()=>signIn("google")}>Sign in to use ChatGPT clone</button>
    </div>
  );
};

export default Login;
