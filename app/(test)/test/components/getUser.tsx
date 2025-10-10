import { fetchAiResponse } from "@/lib/fetchers/ai";
import { Message } from "@/types/message";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function GetUser({
  user,
  setMessage,
}: {
  user: Message[];
  setMessage: Dispatch<SetStateAction<Message[]>>;
}) {
  useEffect(() => {
    const processMessage = async () => {
      const assistantMessage = await fetchAiResponse(
        user[user.length - 1].content
      );

      console.log(assistantMessage);
      console.log(assistantMessage);
    };
    processMessage();
  }, [user]);

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      {user.map((res, index) => (
        <div
          key={index}
          className={`flex ${res.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <h1
            className={`max-w-lg px-3 py-3 rounded-xl break-words whitespace-pre-wrap overflow-hidden ${
              res.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-neutral-900 text-white"
            }`}
          >
            {res.content}
          </h1>
        </div>
      ))}
    </div>
  );
}
