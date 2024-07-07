import localforage from 'localforage'

const dbName = 'daily-note'

export const store = {
  notes: {
    name: dbName,
    storeName: 'notes',
    description: 'This store saves daily notes',
  },
}

export const notesStore = localforage.createInstance(store.notes)
