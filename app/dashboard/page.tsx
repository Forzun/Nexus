import CreateNotebookButton from "@/components/create-notebook-button";
import { NotebookCard } from "@/components/notebook-card";
import PageWrapper from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebook";

export default async function Dashboard(){ 

    const notebooks = await getNotebooks();
    console.log(notebooks);


    return<PageWrapper breadcrumbs={[{label: "Dashboard" , href:"/dashboard"}]}>
        <h1>Notebooks</h1>
         
        <CreateNotebookButton />
        
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notebooks.sucess && 
                notebooks?.data?.map(notebook => ( 
                    <NotebookCard key={notebook.id} notebook={notebook}/>
                ))
            }
        </div>

        {notebooks.sucess && notebooks?.data?.length == 0 && ( 
            <div>No notebooks found</div>
        )}
    </PageWrapper>
}
