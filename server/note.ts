"use server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export const crateNote = async (value : {title: string , content: string, notebookId: string}) => { 
    try{
        const note = await prisma.note.create({ 
            data: { 
                title: value.title, 
                content: value.content,
                notebookId: value.notebookId
            }
        })        
    
        return {sucess: true , message: "Note created successfully"}

    }catch(error){ 
        return {sucess: false , message: "Failed to create note"}
    }
}

export const getNoteById = async (id: string) => { 
    try{ 
        const note = await prisma.note.findUnique({ 
            where: { 
                id: id
            }, 
        })

        if(!note){
            return {sucess: false , message: "note not found"}
        }

        return {sucess: true , message:"note fetched sucessfully" , data: note}
        
    }catch(error){ 
        return {sucess: false , message: "failed to get note"}
    }
}

export const updateNote = async (id: string , value: {title: string}) => { 
    try{ 
        const note = await prisma.note.update({ 
            where: { 
                id: id
            },
            data: { 
                title: value.title
            }
        })
        return {sucess: true , message: "note updated sucessfully"}
    }catch(error){ 
        return {sucess: false , message: "failed to update note"}
    }
} 

export const deleteNote = async (id: string) => { 
    try{ 
        const note = await prisma.note.delete({ 
            where: {
                id: id
            }, 
        })

        return {sucess: true , message: "note deleted sucessfully", data: note}
    }catch(error){ 
        return {sucess: false , message:"failed to delete note"}
    }
}


