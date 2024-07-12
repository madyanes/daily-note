import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useLoaderData } from 'react-router-dom'

import {
  archiveUnarchiveNote,
  deleteNoteById,
} from '../utils/localforageHelpers'

import '../styles/NoteDetail.css'

export default function NoteDetail() {
  const { note: initialNote } = useLoaderData()
  const [note, setNote] = useState(initialNote)
  const navigate = useNavigate()
  const { noteId } = useParams()

  const handleArchiveNote = async () => {
    try {
      await archiveUnarchiveNote(noteId)

      setNote((prevNote) => ({
        ...prevNote,
        metadata: {
          ...prevNote.metadata,
          isArchived: !prevNote.metadata.isArchived,
        },
      }))
    } catch (error) {
      console.error('Failed to archive/unarchive note:', error)
    }
  }

  const handleDeleteNote = async () => {
    try {
      await deleteNoteById(noteId)
      navigate('/')
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  useEffect(() => {
    setNote(initialNote)
  }, [initialNote])

  if (!note) {
    return <p>Note not found.</p>
  }

  return (
    <>
      <div id='note-metadata'>
        <small>
          Created at {new Date(note.metadata.createdAt).toLocaleString()}
        </small>
        <small>ID: {noteId}</small>
        <small>
          Last modified at {new Date(note.metadata.updatedAt).toLocaleString()}
        </small>
      </div>
      <div id='content'>
        <article dangerouslySetInnerHTML={{ __html: note.note }} />
        <aside>
          <Link to={`/${noteId}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleArchiveNote}>
            {!note.metadata.isArchived ? 'Archive' : 'Unarchive'}
          </button>
          <button onClick={handleDeleteNote}>Delete</button>
        </aside>
      </div>
    </>
  )
}
