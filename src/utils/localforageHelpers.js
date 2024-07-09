import { notesStore } from './dbConfig'

export const getNoteById = async (noteId) => {
  const note = await notesStore.getItem(noteId)
  return note
}

export const addNote = async (note) => {
  const key = `note_${Date.now()}`
  const metadata = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
