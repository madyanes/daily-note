import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  getNoteById,
  archiveUnarchiveNote,
  deleteNoteById,
} from '../utils/localforageHelpers'

import '../styles/NoteDetail.css'

export default function NoteDetail() {
  const navigate = useNavigate()
  const { noteId } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleArchiveNote = async () => {
    try {
      await archiveUnarchiveNote(noteId)
      const updatedNote = await getNoteById(noteId)
      setNote(updatedNote)
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
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNoteById(noteId)
        setNote(fetchedNote)
      } catch (error) {
        console.error('Failed to fetch note:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [noteId])

  if (loading) {
    return <p>Loading...</p>
  }

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
          <button onClick={() => handleArchiveNote(noteId)}>
            {!note.metadata.isArchived ? 'Archive' : 'Unarchive'}
          </button>
          <button onClick={handleDeleteNote}>Delete</button>
        </aside>
      </div>
    </>
  )
}
