import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import styled from 'styled-components'

const MainNavigation = (props) => {
  const { data } = useContext(UserContext)

  return (
    <Header>
      <Logo>
        <h1>EasyEvent</h1>
      </Logo>
      <Nav>
        <ul>
          <li>
            <NavLink to='/auth'>
              Authenticate
            </NavLink>
          </li>
          <li>
            <NavLink to='/events'>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to='/bookings'>
              Bookings
            </NavLink>
          </li>
        </ul>
      </Nav>
      <Login>
        {data ? (
          <Link to='account'>{data.name}</Link>
        ) : (
          <Link to='Auth'>Login</Link>
        )}
      </Login>
    </Header>
  )
}

const Header = styled.header`
  display: grid;
  grid-template-columns: 100px auto 100px;
  gap: 10px;
  align-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: var(--clr-primary);
  padding: 0 1rem;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--clr-lightgray);
    height: 100%;
  }
`

const Logo = styled.div`
  margin: 0 1.5rem;
  pointer-events: none;
`

const Nav = styled.div`
  margin: 0 1.5rem;
  justify-self: center;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin: 0 1rem;
      a {
        text-decoration: none;
        color: var(--clr-lightgray);
        font-size: 1.2rem;
      }
      a:hover,
      a:active {
        color: var(--clr-secondary-dark);
        transition: color 250ms ease-in-out;
      }
      a.active {
        color: var(--clr-secondary-dark);
      }
      a.active:after {
        content: '';
        height: 2px;
        width: 100%;
        background: currentColor;
        display: block;
      }
    }
  }
`

const Login = styled.div`
  justify-self: flex-end;
  color: var(--clr-lightgray);
  a {
    color: inherit;
  }
`

export default MainNavigation
