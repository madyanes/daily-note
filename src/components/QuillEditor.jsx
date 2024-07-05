import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default function QuillEditor() {
  const quillRef = useRef(null)
  const quillInstance = useRef(null)

  useEffect(() => {
    if (!quillInstance.current && quillRef.current) {
      quillInstance.current = new Quill(quillRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <>
      <div ref={quillRef} style={{ height: '50vh' }} />
      <button id='save-note'>Save</button>
    </>
  )
}
