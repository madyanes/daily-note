import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default function QuillEditor() {
  const editorRef = useRef(null)
  const quillRef = useRef(null) // Ref untuk menyimpan instance Quill

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })

      // Event listener untuk mendapatkan konten editor
      quillRef.current.on('text-change', () => {
        console.log(quillRef.current.root.innerHTML)
      })
    }
  }, []) // Hanya menjalankan effect ini sekali setelah komponen dipasang

  return <div ref={editorRef} style={{ height: '300px' }} />
}
