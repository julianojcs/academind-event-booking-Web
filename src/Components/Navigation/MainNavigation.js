import { NavLink } from 'react-router-dom'
import styles from './MainNavigation.module.css'

const MainNavigation = (props) => {
  return (
    <header>
      <div className={styles.main_navigation__logo}>
        <h1>EasyEvent</h1>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/auth' activeClassName={styles.nav_active}>
              Authenticate
            </NavLink>
          </li>
          <li>
            <NavLink to='/events' activeClassName={styles.nav_active}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to='/bookings' activeClassName={styles.nav_active}>
              Bookings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
