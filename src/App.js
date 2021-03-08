import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { UserStorage } from './UserContext'
import PageNotFound from './Pages/404'
import AuthPage from './Pages/Auth'
import BookingsPage from './Pages/Booking'
import EventsPage from './Pages/Events'
import MainNavigation from './Components/Navigation/MainNavigation'

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <MainNavigation />
        <main>
          <Switch>
            <Redirect exact from='/' to='/auth' />
            <Route exact path='/auth' component={AuthPage} />
            <Route exact path='/events' component={EventsPage} />
            <Route exact path='/bookings' component={BookingsPage} />
            <Route exact path='/account' component={BookingsPage} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </main>
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
