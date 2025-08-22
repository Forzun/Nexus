import TipEditor from "@/components/TipEditor";
import PageWrapper from "@/components/page-wrapper";
import Tiptap from "@/components/righ-text-editor";
import { getNoteById } from "@/server/note";

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
          label: note.data?.title ?? "Note",
          href: `/dashboard/note/${noteId}`,
        },
      ]}
    >
      <div>{note.data?.title}</div>
      <TipEditor />
    </PageWrapper>
  );
}