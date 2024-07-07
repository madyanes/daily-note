import { useEffect, useState } from 'react'

import { notesStore } from '../utils/dbConfig'

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

  return (
    <>
      <h1>Notes</h1>
      {notes.length ? (
        notes.map((note) => {
          return (
            <article
              key={note.id}
              dangerouslySetInnerHTML={{ __html: note.note }}
              className='notes'
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
