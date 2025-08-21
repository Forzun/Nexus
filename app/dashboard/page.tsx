import CreateNotebookButton from "@/components/create-notebook-button";
import PageWrapper from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebook";

export default async function Dashboard(){ 

    const notebooks = await getNotebooks();

    return<PageWrapper breadcrumbs={[{label: "Dashboard" , href:"/dashboard"}]}>
        <h1>Notebooks</h1>
         
         {notebooks.sucess && 
            notebooks?.data?.map((notebook) => ( 
                <div key={notebook.id}>{notebook.name}</div>
            ))
         }

        {notebooks.sucess && notebooks?.data?.length == 0 && ( 
            <div>No notebooks found</div>
        )}
    <CreateNotebookButton />
    </PageWrapper>
}
