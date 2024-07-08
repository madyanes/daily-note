import { useEffect, useState } from 'react'

import { deleteNoteById } from '../utils/localforageHelpers'
import { notesStore } from '../utils/dbConfig'
import Note from './Note'

import '../styles/Notes.css'

export default function Notes() {
  const [notes, setNotes] = useState(new Array())

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await getAllNotes()
      setNotes(allNotes)
    }

    fetchNotes()
  }, [])

  const getAllNotes = async () => {
    const notes = new Array()

    await notesStore.iterate((value, key) => {
      notes.push({
        id: key,
        ...value,
      })
    })

    return notes
  }

  const handleDeleteNote = async (noteId) => {
    console.log('clicked')
    try {
      await deleteNoteById(noteId)
    } catch (error) {
      console.error('Gagal hapus catatan:', error)
    }
  }

  return (
    <>
      <h1>Notes</h1>
      {notes.length ? (
        notes.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              handleDeleteNote={handleDeleteNote}
            />
          )
        })
      ) : (
        <article className='notes no-notes'>
          <p>No notes available</p>
        </article>
      )}
    </>
  )
}
