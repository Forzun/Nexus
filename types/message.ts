
export interface Message {
    role: "user" | "assistant";
    content: string;
    status?: "pending" | "accepted" | "rejected";
  }

export interface FetchResponse { 
  text:string
}

