import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Error from './components/Error.jsx'
import Notes from './components/Notes.jsx'
import NewNote from './components/NewNote.jsx'
import NoteDetail from './components/NoteDetail.jsx'
import { getAllNotes, getNoteById } from './utils/localforageHelpers.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Notes />,
        loader: getAllNotes,
      },
      {
        path: 'archives',
        element: <Notes isArchived={true} />,
        loader: getAllNotes,
      },
      {
        path: 'new',
        element: <NewNote />,
      },
      {
        path: ':noteId',
        element: <NoteDetail />,
        loader: getNoteById,
      },
      {
        path: ':noteId/edit',
        element: <NewNote />,
        loader: getNoteById,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
