import { notesStore } from './dbConfig'

export const deleteNoteById = async (noteId) => {
  await notesStore.removeItem(noteId)
}
