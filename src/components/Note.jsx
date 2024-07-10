import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TfiTrash, TfiPencilAlt, TfiArchive } from 'react-icons/tfi'

import '../styles/Note.css'

export default function Note({ note, handleArchiveNote, handleDeleteNote }) {
  return (
    <>
      <div className='wrapper-note'>
        <div className='note-metadata'>
          <div className='note-id'>
            <Link to={`/${note.id}`}>
              <small>ID: {note.id}</small>
            </Link>
          </div>
          <div className='controls-note'>
            <button onClick={() => handleArchiveNote(note.id)}>
              <TfiArchive className='control-archive-icon' />
            </button>
            <Link to={`/${note.id}/edit`}>
              <button>
                <TfiPencilAlt className='control-update-icon' />
              </button>
            </Link>
            <button onClick={() => handleDeleteNote(note.id)}>
              <TfiTrash className='control-delete-icon' />
            </button>
          </div>
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: note.note }}
          className='notes'
        />
      </div>
    </>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
  handleArchiveNote: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
}
