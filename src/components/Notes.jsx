import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {
  archiveUnarchiveNote,
  deleteNoteById,
} from '../utils/localforageHelpers'
import { notesStore } from '../utils/dbConfig'
import Note from './Note'

import '../styles/Notes.css'

export default function Notes({ isArchived }) {
  const [notes, setNotes] = useState(new Array())

  useEffect(() => {
    const fetchNotes = async () => {
      let allNotes = await getAllNotes()
      if (isArchived) {
        allNotes = allNotes.filter((note) => note.metadata.isArchived)
      } else {
        allNotes = allNotes.filter((note) => !note.metadata.isArchived)
      }
      setNotes(allNotes)
    }

    fetchNotes()
  }, [isArchived])

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

  const handleArchiveNote = async (noteId) => {
    await archiveUnarchiveNote(noteId)
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
  }

  const handleDeleteNote = async (noteId) => {
    console.log('clicked')
    try {
      await deleteNoteById(noteId)
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
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
              handleArchiveNote={handleArchiveNote}
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

Notes.propTypes = {
  isArchived: PropTypes.bool,
}
