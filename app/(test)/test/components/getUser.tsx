"use client";
import { Button } from "@/components/ui/button";
import { fetchAiResponse } from "@/lib/fetchers/ai";
import { updateNote } from "@/server/note";
import { Message } from "@/types/message";
import { Editor } from "@tiptap/react";
import { Check, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const processedMessages = useRef(new Set<number>());

  useEffect(() => {
    const processMessage = async () => {
      const lastUserMessageIndex = user.length - 1;
      const lastMessage = user[lastUserMessageIndex];
      if (
        lastMessage?.role === "user" &&
        !processedMessages.current.has(lastUserMessageIndex) &&
        (user.length === lastUserMessageIndex + 1 ||
          user[lastUserMessageIndex + 1]?.role !== "assistant")
      ) {
        processedMessages.current.add(lastUserMessageIndex);
        setLoading(true);

        try {
          const assistantMessage = await fetchAiResponse(lastMessage.content);
          console.log("AI Response:", assistantMessage);

          setMessage((prev) => [
            ...prev,
            { role: "assistant", content: assistantMessage, status: "pending" },
          ]);
        } catch (error) {
          console.error("Error fetching AI response:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    // processMessage();
  }, [user.length]);

  const handleReject = (index: number) => {
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

    if (editor && item.role === "assistant") {
      editor.chain().focus().insertContent(item.content).run();
      const content = editor.getJSON();
      if (noteId) updateNote(noteId, { content });
    }
  };

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      {user.map((res, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`flex ${res.role === "user" ? "justify-end" : "justify-start"} transition-all duration-300 ease-in-out`}
        >
          <div
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
            <p>{res.content}</p>

            {res.status === "pending" && res.role === "assistant" && (
              <div
                className={`transition-all duration-300 ${
                  hoveredIndex === index
                    ? "opacity-100 translate-y-0 max-h-20"
                    : "opacity-0 translate-y-2 max-h-0"
                }`}
              >
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => handleAccept(index)}
                    size="sm"
                    className="bg-green-600/20 text-green-700 rounded-lg hover:bg-green-600/30 transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleReject(index)}
                    size="sm"
                    className="bg-rose-600/20 text-rose-700 rounded-lg hover:bg-rose-600/30 transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-neutral-900 text-white px-4 py-3 rounded-xl">
            <div className="flex gap-2">
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
