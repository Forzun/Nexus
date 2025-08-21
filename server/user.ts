"use server";
import { auth } from "@/lib/auth"

export const signInUser = async (email: string , password: string) => { 
    try{ 
        await auth.api.signInEmail({ 
            body:{ 
                email: email, 
                password: password
            },
        })

        return {success: true , message: "signed successfully"}
    }catch(error){ 
        const e = error as Error; 
        return {success: false , message: e.message || "failed to sign in"}
}
}

export const signUpUser = async (email: string , password: string , name: string) => { 
    try{
        await auth.api.signUpEmail({ 
            body: {
                email: email, 
                password: password,
                name: name
            }
        })
        return {success: true , message:"signed up successfully"}
    }catch(error){ 
        const e = error as Error; 
        return {success: false , message: e.message || "failed to sign up"}
    }
}


