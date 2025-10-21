import { NoteCard } from "@/components/notebook-card";
import PageWrapper from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebook";

type notebookProps = Promise<{
  notebook: string;
}>;

export default async function NotebookPage({
  params,
}: {
  params: notebookProps;
}) {
  const { notebook } = await params;

  const notes = await getNotebookById(notebook);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: notes.data?.name ?? "notebook",
          href: `/dashboard/notebook/note/${notebook}`,
        },
      ]}
    >
      
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.data && <NoteCard notebook={notes.data} />}
      </div>
    </PageWrapper>
  );
}
