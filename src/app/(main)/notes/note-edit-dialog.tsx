"use client"

import { useMutation } from "convex/react"
import { Doc } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface NoteEditDialogProps {
    note: Doc<"notes">
    open: boolean
    onOpenChange: (open: boolean)=> void
}

export function NoteEditDialog({note, open, onOpenChange}: NoteEditDialogProps) {
    const updateNote = useMutation(api.notes.updateNote)

    const [title, setTitle] = useState(note.title)
    const [body, setBody] = useState(note.body)

    const handleSave = async ()=> {
        await updateNote({id:note._id, title, body})
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Title"/>
                    <Textarea value={body} onChange={(e)=> setBody(e.target.value)} placeholder="Body" rows={6}/>
                    <Button onClick={handleSave} className="flex ml-auto">
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}