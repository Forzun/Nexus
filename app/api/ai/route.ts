import { fetchFromOpenrouter } from "@/lib/openrouter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){ 
    try{ 
        const {text} = await req.json(); 
        console.log(text); 

        const response = await fetchFromOpenrouter(text); 

        if(!response){ 
            return NextResponse.json({sucess: false , message: "failed to fetch from ai"});
    }

        return NextResponse.json({
            sucess: true, 
            message: response || "No response from AI"
        })

    }catch(error){  
        return NextResponse.json({sucess: false , message: "failed to fetch from ai"})
    }
}

