export default function Note({ note }) {
  return (
    <>
      <article
        dangerouslySetInnerHTML={{ __html: note.note }}
        className='notes'
      />
    </>
  )
}
