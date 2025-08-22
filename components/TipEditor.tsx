"use client";

import { useState } from "react";
import Tiptap from "./righ-text-editor";

export default function TipEditor(){ 
    const [jobDescription, setJobDescription] = useState("");
    
    return <Tiptap editorContent={jobDescription} onChange={setJobDescription} />
}


