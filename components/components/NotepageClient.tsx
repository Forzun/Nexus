"use client";

import RichTextEditor from "@/components/righ-text-editor";
import AiInput from "@/app/(test)/test/components/Input";
import { JSONContent, Editor } from "@tiptap/react";
import { useState } from "react";

export default function NotepageClient({
  noteId,
  content,
}: {
  noteId: string;
  content: JSONContent[];
}) {
  const [editor, setEditor] = useState<Editor | undefined>();

  return (
    <div className="gap-3 w-full flex"> 
      <div>
        <RichTextEditor
          content={content}
          noteId={noteId}
          onReady={setEditor}
        />
      </div>

      {/* Pass editor instance to AI component */}
      {editor && <AiInput nodeId={noteId} editor={editor} />}
    </div>
  );
}
