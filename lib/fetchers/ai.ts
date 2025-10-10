
export async function fetchAiResponse(question: string): Promise<string> { 
    const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: question })
    });

    const data = await res.json()
    // API currently returns { sucess, messaeg } or { sucess: false, message }
    return data
} 


