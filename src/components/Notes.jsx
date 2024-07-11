import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  archiveUnarchiveNote,
  deleteNoteById,
} from '../utils/localforageHelpers'
import Note from './Note'

import '../styles/Notes.css'

export default function Notes({ isArchived }) {
  const allNotes = useLoaderData()
  const [notes, setNotes] = useState(allNotes)

  useEffect(() => {
    if (isArchived) {
      setNotes(allNotes.filter((note) => note.metadata.isArchived))
    } else {
      setNotes(allNotes.filter((note) => !note.metadata.isArchived))
    }
  }, [isArchived, allNotes])

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
      <h1>{!isArchived ? 'Notes' : 'Archived Notes'}</h1>
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
          <p>No {!isArchived ? 'notes' : 'archived notes'} available</p>
        </article>
      )}
    </>
  )
}

Notes.propTypes = {
  isArchived: PropTypes.bool,
}
