import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

const Message = ({ message }: Props) => {
    const isChatGpt = message?.user?.name  === "ChatGPT"

  return <div className={` text-white py-5 ${isChatGpt && "bg-[#434654]"}`}>
    <div className="space-x-5 flex px-10 max-w-2xl mx-auto">
        <img src={message?.user?.avi} alt="" className="h-8 w-8"/>
        <p className="pt-1 text-sm">
            {message.text}
        </p>
    </div>
  </div>;
};

export default Message;
