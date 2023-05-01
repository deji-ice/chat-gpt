/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import { SunIcon, BoltIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";



export default function Home() {
  return (
    <div className="flex text-white flex-col items-center justify-center px-2 h-screen ">
      <h1 className="text-4xl font-bold my-10">Chat GPT</h1>
      {/* make examples flex-col in sm screeens and flex-row in md screens */}
      <div className=" flex space-x-2 text-center text-sm">
        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-col items-center mb-5">
          <SunIcon className="h-8 w-8" />
          <h1>Examples</h1>
          </div>
          <div className="space-y-5">
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className=" flex flex-col items-center mb-5">
          <BoltIcon className="h-8 w-8" />
          <h1>Capabilities</h1>
          </div>
          <div className="space-y-5">
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-col items-center mb-5">
          <ExclamationTriangleIcon className="h-8 w-8" />
          <h1>Limitations</h1>
          </div>
          <div className="space-y-5">
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
            <p className="infoText">"Got any creative ideas for a 10 year old’s birthday?"</p>
            <p className="infoText">"ChatGPT may generate responses that are offensive"</p>
          </div>
        </div>
      </div>
    </div >
  );
}
