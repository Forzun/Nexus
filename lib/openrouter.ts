
export async function fetchFromOpenrouter(text: string){ 

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", { 
        method: "POST", 
        headers: { 
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3.1:free",
            messages: [
              {
                role: "user",
                content: text,
              }
            ]
          })
        });
        
        console.log(await response.json());
        if(!response.ok){ 
            return {sucess: false , message: "failed to fetch from router"}
        }

        const data = await response.json(); 
        const test = data.choices[0].message.content.replace(/<｜begin▁of▁sentence｜>/g, "")
        .replace(/<｜end▁of▁sentence｜>/g, "")
        .trim();
        return test;
}


