"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";
import { NotePreviewDialog } from "./note-preview-dialog";
import { useState } from "react";
import { NoteEditDialog } from "./note-edit-dialog";
import { Pencil } from "lucide-react";

interface NoteItemProps {
  note: Doc<"notes">;
}

export function NoteItem({ note }: NoteItemProps) {
  const [editOpen, setEditOpen] = useState(false);

  function handleOpenNote() {
    window.history.pushState(null, "", `?noteId=${note._id}`);
  }

  return (
    <>
      <NoteEditDialog
        note={note}
        open={editOpen}
        onOpenChange={(open) => setEditOpen(open)}
      />
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow relative"
        onClick={handleOpenNote}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            setEditOpen(true);
          }}
          className="absolute top-2 right-2 p-1 rounded hover:bg-muted"
        >
          <Pencil />
        </button>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="line-clamp-3 text-sm text-muted-foreground whitespace-pre-line">
            {note.body}
          </div>
        </CardContent>
      </Card>
      <NotePreviewDialog note={note} />
    </>
  );
}
