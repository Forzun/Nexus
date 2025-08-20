import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export const createNotebook = async (value : {name: string , userId: string}) => { 
    try{
        const notebook = await prisma.notebook.create({ 
            data: { 
                name: value.name, 
                userId: value.userId
            }
        })        
    
        return {sucess: true , message: "Notebook create sucessfully"}

    }catch(error){ 
        return {sucess: false , message: "failed to create notebook"}
    }
}


export const getNotebooks = async () => { 
    try{
        const session = await auth.api.getSession({ 
            headers: await headers()
        });

        const userId = session?.user?.id; 

        if(!userId){ 
            return {sucess: false , message: "you are not logged in"}
        }

        const notebooks = await prisma.notebook.findMany({ 
            where: {
                 userId: userId
            },
            include: {notes: true}
        })

        return {sucess: true , message: "notebooks fetched sucessfully" , data: notebooks}

    }catch(error){ 
        return {sucess: false , message: "failed to get notebooks"}
    }
}

export const getNotebookById = async (id: string) => { 
    try{ 
        const notebook = await prisma.notebook.findUnique({ 
            where: { 
                id: id
            }, 
            include: {notes: true}
        })

        if(!notebook){
            return {sucess: false , message: "notebook not found"}
        }

        return {sucess: true , message:"notebook fetched sucessfully" , data: notebook}
        
    }catch(error){ 
        return {sucess: false , message: "failed to get notebook"}
    }
}

export const updateNotebook = async (id: string , value: {name: string}) => { 
    try{ 
        const notebook = await prisma.notebook.update({ 
            where: { 
                id: id
            },
            data: { 
                name: value.name
            }
        })
        return {sucess: true , message: "notebook updated sucessfully"}
    }catch(error){ 
        return {sucess: false , message: "failed to update notebook"}
    }
} 

export const deleteNotebook = async (id: string) => { 
    try{ 
        const notebook = await prisma.notebook.delete({ 
            where: {
                id: id
            }, 
        })

        return {sucess: true , message: "notebook deleted sucessfully", data: notebook}
    }catch(error){ 
        return {sucess: false , message:"failed to delete notebook"}
    }
}








