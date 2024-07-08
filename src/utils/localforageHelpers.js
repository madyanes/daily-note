import { notesStore } from './dbConfig'

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
