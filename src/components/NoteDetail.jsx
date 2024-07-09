import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getNoteById } from '../utils/localforageHelpers'

import '../styles/NoteDetail.css'

export default function NoteDetail() {
  const { noteId } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

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
          Last modifiet at {new Date(note.metadata.updatedAt).toLocaleString()}
        </small>
      </div>
      <div id='content'>
        <article dangerouslySetInnerHTML={{ __html: note.note }} />
        <aside>
          <Link to={`/${noteId}/edit`}>
            <button>Edit</button>
          </Link>
          <button>Archive</button>
          <button>Delete</button>
        </aside>
      </div>
    </>
  )
}
