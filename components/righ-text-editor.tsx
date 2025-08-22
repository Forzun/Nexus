import { TextStyleKit } from '@tiptap/extension-text-style'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const extensions = [TextStyleKit, StarterKit]

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isBold 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isItalic 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isStrike 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isCode 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Code
        </button>
        <button 
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="px-3 py-2 text-sm font-medium rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Clear marks
        </button>
        <button 
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="px-3 py-2 text-sm font-medium rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isParagraph 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isHeading1 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isHeading2 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isHeading3 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isHeading4 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isHeading5 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isHeading6 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isBulletList 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isOrderedList 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isCodeBlock 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            editorState.isBlockquote 
              ? 'bg-blue-100 border-blue-300 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Blockquote
        </button>
        <button 
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-2 text-sm font-medium rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Horizontal rule
        </button>
        <button 
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="px-3 py-2 text-sm font-medium rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Hard break
        </button>
        <button 
          onClick={() => editor.chain().focus().undo().run()} 
          disabled={!editorState.canUndo}
          className="px-3 py-2 text-sm font-medium rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Undo
        </button>
        <button 
          onClick={() => editor.chain().focus().redo().run()} 
          disabled={!editorState.canRedo}
          className="px-3 py-2 text-sm font-medium rounded-md border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Redo
        </button>
      </div>
    </div>
  )
}

export default () => {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic >styles you'd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
</p>
<blockquote>
  Wow, that's amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-6',
      },
    },
  })

  return (
    <div className="max-w-4xl border border-gray-300 rounded-lg shadow-sm bg-transparent">
      {editor && <MenuBar editor={editor} />}
      <div className="prose-editor">
        <style jsx global>{`
          .prose-editor .tiptap > :first-child {
            margin-top: 0;
          }
          
          .prose-editor .tiptap ul,
          .prose-editor .tiptap ol {
            padding-left: 1rem;
            margin: 1.25rem 1rem 1.25rem 0.4rem;
          }
          
          .prose-editor .tiptap ul li p,
          .prose-editor .tiptap ol li p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
          }
          
          .prose-editor .tiptap h1,
          .prose-editor .tiptap h2,
          .prose-editor .tiptap h3,
          .prose-editor .tiptap h4,
          .prose-editor .tiptap h5,
          .prose-editor .tiptap h6 {
            line-height: 1.1;
            margin-top: 2.5rem;
          }
          
          .prose-editor .tiptap h1,
          .prose-editor .tiptap h2 {
            margin-top: 3.5rem;
            margin-bottom: 1.5rem;
          }
          
          .prose-editor .tiptap h1 {
            font-size: 1.4rem;
          }
          
          .prose-editor .tiptap h2 {
            font-size: 1.2rem;
          }
          
          .prose-editor .tiptap h3 {
            font-size: 1.1rem;
          }
          
          .prose-editor .tiptap h4,
          .prose-editor .tiptap h5,
          .prose-editor .tiptap h6 {
            font-size: 1rem;
          }
          
          .prose-editor .tiptap code {
            background-color: #f3e8ff;
            border-radius: 0.4rem;
            color: #000;
            font-size: 0.85rem;
            padding: 0.25em 0.3em;
          }
          
          .prose-editor .tiptap pre {
            background: #000;
            border-radius: 0.5rem;
            color: #fff;
            font-family: 'JetBrainsMono', 'Courier New', monospace;
            margin: 1.5rem 0;
            padding: 0.75rem 1rem;
          }
          
          .prose-editor .tiptap pre code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
          }
          
          .prose-editor .tiptap blockquote {
            border-left: 3px solid #d1d5db;
            margin: 1.5rem 0;
            padding-left: 1rem;
          }
          
          .prose-editor .tiptap hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 2rem 0;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}