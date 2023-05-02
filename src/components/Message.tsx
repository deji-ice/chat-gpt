import { DocumentData } from "firebase/firestore";
import Image from "next/image";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props) => {
  const isChatGpt = message?.user?.name === "ChatGPT";

  return (
    <div className={` text-white py-5 ${isChatGpt && "bg-[#434654]"}`}>
      <div className="space-x-5 flex px-10 max-w-2xl mx-auto">
        <Image src={message?.user?.avi} alt="" width={30} height={30} className="w-8 h-8"/>
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
