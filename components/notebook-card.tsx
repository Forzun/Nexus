"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notebook , Note } from "@prisma/client";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotebookCardProps { 
    notebook: Notebook & {notes: Note[]}
}

export default function NotebookCard({notebook}: NotebookCardProps) {
  const [isDelete , setIsDelete] = useState(false);
  const router = useRouter();
    
  const handleDelete = async() => { 
      try{ 
        setIsDelete(true)
        const response = await deleteNotebook(notebook.id);
        if(response.sucess){ 
          toast.success("Notebook deleted sucessfully");
          router.refresh();
        }
      }catch(error){
         toast.error("failed to delete notebook");
      }finally{
        setIsDelete(false);
      }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
            <p>{notebook.name}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{notebook.notes.length ?? 0} notes</p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant={"outline"} >
            View
        </Button>
        <Button variant={"destructive"} onClick={handleDelete}>
            { isDelete ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" /> }
        </Button>
      </CardFooter>
    </Card>
  );
}
