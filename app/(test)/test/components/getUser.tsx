"use client";
import { Button } from "@/components/ui/button";
import { fetchAiResponse } from "@/lib/fetchers/ai";
import { updateNote } from "@/server/note";
import { Message } from "@/types/message";
import { Editor } from "@tiptap/react";
import { Check, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function GetUser({
  user,
  setMessage,
  editor,
  noteId,
}: {
  user: Message[];
  setMessage: Dispatch<SetStateAction<Message[]>>;
  editor?: Editor;
  noteId?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const processMessage = async () => {
      setLoading(true);
      const assistantMessage = await fetchAiResponse(
        user[user.length - 1].content
      );
      setMessage([
        ...user,
        { role: "assistant", content: assistantMessage, status: "pending" },
      ]);
      setLoading(false);
      console.log(assistantMessage);
    };
    // processMessage();
  }, [user]);

  const handleReject = (index: number) => {
    const item = user[index];

    setMessage((prev) =>
      prev.map((item, id) =>
        id === index ? { ...item, status: "rejected" } : item
      )
    );
  };

  const handleAccept = (index: number) => {
    const item = user[index];

    setMessage((prev) =>
      prev.map((item, id) =>
        id === index ? { ...item, status: "accepted" } : item
      )
    );

    console.log(editor)
    if (editor && item.role === "assistant") {
      editor.chain().focus().insertContent(item.content).run();
      console.log(editor.getJSON());
      // const content = editor.getJSON();
      // if (noteId) updateNote(noteId, { content });
    }
  };

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      {user.map((res, index) => (
        <div
          key={index}
          onMouseEnter={() => setShowSpinner(true)}
          onMouseLeave={() => setShowSpinner(false)}
          className={`flex ${res.role === "user" ? "justify-end" : "justify-start"} transition-all duration-300 ease-in-out`}
        >
          <h1
            className={`max-w-lg px-3 py-3 rounded-xl break-words whitespace-pre-wrap overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
              res.role === "user"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : res.status === "accepted"
                  ? "bg-green-600 text-white"
                  : res.status === "rejected"
                    ? "bg-rose-700 text-white"
                    : "bg-neutral-900 text-white hover:bg-neutral-900/80"
            }`}
          >
            {res.content}
            {res.status === "pending" && res.role === "assistant" && (
              <div>
                {showSpinner && (
                  <div className="flex gap-2 no-scrollbar items-start animate-in slide-in-from-bottom-1 fade-in duration-300">
                    <Button
                      onClick={() => handleAccept(index)}
                      size="sm"
                      className="bg-green-600/20 text-green-700 rounded-lg border-1 hover:bg-green-600/30 transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(index)}
                      size="sm"
                      className="bg-rose-600/20 text-rose-700 rounded-lg hover:bg-rose-600/30 transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )}
          </h1>
        </div>
      ))}
    </div>
  );
}
