import { TfiTrash, TfiPencilAlt, TfiArchive } from 'react-icons/tfi'

import '../styles/Note.css'

export default function Note({ note }) {
  return (
    <>
      <div className='wrapper-note'>
        <div className='controls-note'>
          <button>
            <TfiArchive className='control-archive-icon' />
          </button>
          <button>
            <TfiPencilAlt className='control-update-icon' />
          </button>
          <button>
            <TfiTrash className='control-delete-icon' />
          </button>
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: note.note }}
          className='notes'
        />
      </div>
    </>
  )
}
