"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Notebook, Note } from "@prisma/client";
import { Button } from "./ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotebookCardProps {
  notebook: Notebook & { notes: Note[] };
}

function NotebookCard({ notebook }: NotebookCardProps) {
  const [isDelete, setIsDelete] = useState(false);
  const [isView, setIsView] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDelete(true);
      const response = await deleteNotebook(notebook.id);
      if (response.sucess) {
        toast.success("Notebook deleted sucessfully");
        router.refresh();
      }
      console.log(response);
    } catch (error) {
      toast.error("failed to delete notebook");
    } finally {
      setIsDelete(false);
    }
  };

  const viewhandler = async () => {
    setIsView(true);
    router.push(`/dashboard/notebook/${notebook.id}`);
  };

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
        <Button onClick={viewhandler} variant={"outline"}>
          {isView ? <Loader2 className="size-4 animate-spin" /> : <p>View</p>}
        </Button>
        <Button
          variant={"destructive"}
          disabled={isDelete}
          onClick={handleDelete}
        >
          {isDelete ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function NoteCard({ notebook }: NotebookCardProps) {
  const [isDelete, setIsDelete] = useState(false);
  const [isView, setIsView] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDelete(true);
      const response = await deleteNotebook(notebook.id);
      if (response.sucess) {
        toast.success("Notebook deleted sucessfully");
        router.refresh();
      }
      console.log(response);
    } catch (error) {
      toast.error("failed to delete notebook");
    } finally {
      setIsDelete(false);
    }
  };

  console.log(notebook)
  const viewhandler = async () => {
    setIsView(true);
    router.push(`/dashboard/notebook/note/${notebook.notes[notebook.notes.length - 1].id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p>{notebook.notes[notebook.notes.length - 1].title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{notebook.notes.length ?? 0} note</p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button onClick={viewhandler} variant={"outline"}>
          {isView ? <Loader2 className="size-4 animate-spin" /> : <p>View</p>}
        </Button>
        <Button
          variant={"destructive"}
          disabled={isDelete}
          onClick={handleDelete}
        >
          {isDelete ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export { NotebookCard, NoteCard };
