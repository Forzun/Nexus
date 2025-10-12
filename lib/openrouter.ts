import { FetchResponse } from "@/types/message";

interface OpenrouterResponse { 
  choices: Array<{
    message: { 
      role: string;
      content: string;
    }
  }>
}

export async function fetchFromOpenrouter(text : {text: Promise<FetchResponse>}) {
    try{ 
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
      },
        
        body: JSON.stringify({
          model: "nousresearch/deephermes-3-llama-3-8b-preview:free",
          messages: [
            { 
              role: "system",
              content: "You are an AI assistant that helps people to write better English. You are also a coder and can write code.",
            }, 
            {
              role: "user",
              content: text,
            },
          ],
        }),
      });
    
      const data = await response.json();

    
      if (!response.ok) {
        const errorMsg = data.error?.message || "Fetch to failed from ai"; 
        console.error("Response through from ai" , { 
          status: response.status, 
          error: data.error,
        })
        return {
          sucess: false, message: errorMsg,
        }
      }

      if(!data.choices?.[0]?.message?.content){ 
        console.error("Response through from ai" , { 
          status: response.status, 
          error: data.error,
        })
        return {
          sucess: false, message: "No response from AI",
        }
      }
    
      return data.choices[0].message.content;
    }catch(error){ 
      console.error("failed to fetch from router");
      return { 
        sucess: false, 
        message: error instanceof Error ? error.message : "unknown error occurred"
      }
    }
}