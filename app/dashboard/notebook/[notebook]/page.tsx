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

  const note = await getNotebookById(notebook);

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note.data?.name ?? "notebook",
          href: `/dashboard/notebook/note/${notebook}`,
        },
      ]}
    >
      <div>{note.data?.name}</div>
    </PageWrapper>
  );
}
