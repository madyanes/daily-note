import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getNoteById } from '../utils/localforageHelpers'

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
      <article dangerouslySetInnerHTML={{ __html: note.note }} />
    </>
  )
}
