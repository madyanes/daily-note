import { useEffect, useRef } from 'react'
import Quill from 'quill'
import localforage from 'localforage'

import 'quill/dist/quill.snow.css'

import { store } from '../utils/dbConfig'

export default function QuillEditor() {
  const quillRef = useRef(null)
  const quillInstance = useRef(null)
  const noteStoreRef = useRef(null)

  useEffect(() => {
    const initializeQuill = () => {
      if (!quillInstance.current && quillRef.current) {
        quillInstance.current = new Quill(quillRef.current, { theme: 'snow' })
      }
    }

    const initializeStores = () => {
      if (!noteStoreRef.current) {
        noteStoreRef.current = localforage.createInstance(store.notes)
      }
    }

    initializeQuill()
    initializeStores()
  }, [])

  return (
    <>
      <div ref={quillRef} style={{ height: '50vh' }} />
      <button id='save-note'>Save</button>
    </>
  )
}
