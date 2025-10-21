import NotepageClient from "@/components/components/NotepageClient";
import PageWrapper from "@/components/page-wrapper";
import { getNoteById } from "@/server/note";
import { JSONContent, Editor } from "@tiptap/react";

type NoteProps = Promise<{
  noteId: string;
}>;

export default async function Notepage({ params }: { params: NoteProps }) {
  const { noteId } = await params;
  const note = await getNoteById(noteId);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note.data?.notebook.name ?? "Notebook",
          href: `/dashboard/notebook/${note.data?.notebook.id}`,
        },
        {
          label: note.data?.title ?? "Note",
          href: `/dashboard/note/${noteId}`,
        },
      ]}
    >
      <div className="flex gap-3 w-full ">
        <NotepageClient
          noteId={noteId}
          content={note.data?.content as JSONContent[]}
        />
      </div>
    </PageWrapper>
  );
}
