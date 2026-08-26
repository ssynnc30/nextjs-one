"use client"

import type { LucideIcon } from "lucide-react"

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  Undo2,
  Redo2,
} from "lucide-react"

import { Editor } from "@tiptap/react"

import { Button } from "./ui/button"

interface ToolBarProps {
  editor: Editor | null
}

interface ToolbarButton {
  name: string
  icon?: LucideIcon
  label?: string
  command: () => void
  canRun: () => boolean
  isActive: () => boolean
}

const ToolBar = ({ editor }: ToolBarProps) => {
  if (!editor) return null

  const buttons: ToolbarButton[] = [
    
    // Bold
    {
      name: "bold",
      icon: Bold,
      isActive: () => editor.isActive("bold"),
      command: () =>
        editor.chain().focus().toggleBold().run(),
      canRun: () =>
        editor.can().chain().focus().toggleBold().run(),
    },

    // Italic
    {
      name: "italic",
      icon: Italic,
      isActive: () => editor.isActive("italic"),
      command: () =>
        editor.chain().focus().toggleItalic().run(),
      canRun: () =>
        editor.can().chain().focus().toggleItalic().run(),
    },

    // Underline
    {
      name: "underline",
      icon: Underline,
      isActive: () => editor.isActive("underline"),
      command: () =>
        editor.chain().focus().toggleUnderline().run(),
      canRun: () =>
        editor
          .can()
          .chain()
          .focus()
          .toggleUnderline()
          .run(),
    },

    // Paragraph
    {
      name: "paragraph",
      label: "P",
      isActive: () => editor.isActive("paragraph"),
      command: () => editor.chain().focus().setParagraph().run(),
      canRun: () =>
        editor.can().chain().focus().setParagraph().run(),
    },

    // Heading 1
    {
      name: "heading1",
      label: "H1",
      isActive: () =>
        editor.isActive("heading", { level: 1 }),
      command: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run(),
      canRun: () =>
        editor
          .can()
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run(),
    },

    // Heading 2
    {
      name: "heading2",
      label: "H2",
      isActive: () =>
        editor.isActive("heading", { level: 2 }),
      command: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .run(),
      canRun: () =>
        editor
          .can()
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .run(),
    },

    // Heading 3
    {
      name: "heading3",
      label: "H3",
      isActive: () =>
        editor.isActive("heading", { level: 3 }),
      command: () =>
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 3 })
          .run(),
      canRun: () =>
        editor
          .can()
          .chain()
          .focus()
          .toggleHeading({ level: 3 })
          .run(),
    },


    // Strike
    {
      name: "strike",
      icon: Strikethrough,
      isActive: () => editor.isActive("strike"),
      command: () =>
        editor.chain().focus().toggleStrike().run(),
      canRun: () =>
        editor.can().chain().focus().toggleStrike().run(),
    },

    // Blockquote
    {
      name: "blockquote",
      icon: Quote,
      isActive: () => editor.isActive("blockquote"),
      command: () =>
        editor.chain().focus().toggleBlockquote().run(),
      canRun: () =>
        editor
          .can()
          .chain()
          .focus()
          .toggleBlockquote()
          .run(),
    },


    // Undo
    {
      name: "undo",
      icon: Undo2,
      isActive: () => false,
      command: () =>
        editor.chain().focus().undo().run(),
      canRun: () =>
        editor.can().chain().focus().undo().run(),
    },

    // Redo
    {
      name: "redo",
      icon: Redo2,
      isActive: () => false,
      command: () =>
        editor.chain().focus().redo().run(),
      canRun: () =>
        editor.can().chain().focus().redo().run(),
    },
  ]

  return (
    <div className="flex flex-wrap gap-2 rounded-md border border-input bg-transparent p-2">
      {buttons.map((button) => {
        const Icon = button.icon
        const isActive = button.isActive()

        return (
          <Button
            key={button.name}
            type="button"
            size="sm"
            variant={isActive ? "default" : "outline"}
            onClick={button.command}
            disabled={!button.canRun()}
          >
            {button.label ? (
              button.label
            ) : Icon ? (
              <Icon className="h-4 w-4" />
            ) : null}
          </Button>
        )
      })}
    </div>
  )
}

export default ToolBar