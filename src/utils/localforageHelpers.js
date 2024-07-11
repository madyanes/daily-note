import { notesStore } from './dbConfig'

export const getAllNotes = async () => {
  const notes = new Array()

  await notesStore.iterate((value, key) => {
    notes.push({
      id: key,
      ...value,
    })
  })

  // Sort notes by updatedAt in descending order (newest first)
  notes.sort(
    (a, b) => new Date(b.metadata.updatedAt) - new Date(a.metadata.updatedAt)
  )

  return notes
}

export const getNoteById = async (noteId) => {
  const note = await notesStore.getItem(noteId)
  return note
}

export const addNote = async (note) => {
  const key = `note_${Date.now()}`
  const date = new Date().toISOString()
  const metadata = {
    isArchived: false,
    createdAt: date,
    updatedAt: date,
  }
  const data = { note, metadata }

  try {
    await notesStore.setItem(key, data)
    return { success: true }
  } catch (error) {
    console.error(
      `Error saving note to ${notesStore.storeName} store. Error: ${error}`
    )
    return { success: false, error }
  }
}

export const deleteNoteById = async (noteId) => {
  await notesStore.removeItem(noteId)
}

export const archiveUnarchiveNote = async (noteId) => {
  try {
    const note = await notesStore.getItem(noteId)

    if (note) {
      note.metadata.isArchived = !note.metadata.isArchived
      await notesStore.setItem(noteId, note)
    } else {
      console.log(`Note with ID ${noteId} not found.`)
    }
  } catch (error) {
    console.log('Error archiving/unarchiving note:', error)
  }
}

export const updateNoteById = async (noteId, updatedNote) => {
  try {
    const existingNote = await notesStore.getItem(noteId)

    if (!existingNote) {
      return { success: false, error: 'Note not found.' }
    }

    const updatedData = {
      ...existingNote,
      note: updatedNote,
      metadata: {
        ...existingNote.metadata,
        updatedAt: new Date().toISOString(),
      },
    }

    await notesStore.setItem(noteId, updatedData)
    return { success: true }
  } catch (error) {
    console.error(
      `Error updating note in ${notesStore.storeName} store. Error: ${error}`
    )
  }
}
