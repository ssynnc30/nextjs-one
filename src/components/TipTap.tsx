'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from './ToolBar'


interface TiptapProps{
    value:string,
    onChange:(value:string)=>void
}

const Tiptap = ({value,onChange}:TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading:{
        levels:[1,2,3]
      }
    })],
    content: value,
    editorProps:{
        attributes:{
        class:"prose dark:prose-invert prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] p-2 border rounded-md border-input bg-transparent ring-offset-background"
        }
    },
    onUpdate:({editor})=>{
       onChange(editor.getHTML())
    },

    immediatelyRender: false,
  
  })

  return (
    <>
    <ToolBar editor={editor}/>
    <EditorContent editor={editor} className='tiptap-editor'/>
    </>
  )
}

export default Tiptap