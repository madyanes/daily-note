import { Link } from 'react-router-dom'

export default function SideMenu() {
  return (
    <section id='side-menu'>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>My Notes</Link>
          </li>
          <li id='new-note'>
            <Link to={'/new'}>New Note</Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}
