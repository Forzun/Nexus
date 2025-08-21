import { getNoteById } from "@/server/note";

type NoteProps = Promise<{ 
    noteId: string
}>

export default async function Notepage({params} : {params: NoteProps}) {
    const { noteId } = await params; 

    const note = await getNoteById(noteId);

    return <div>{note.data?.title}</div>
} 


