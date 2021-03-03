import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PageNotFound from './Pages/404'
import AuthPage from './Pages/Auth'
import BookingsPage from './Pages/Booking'
import EventsPage from './Pages/Events'
import MainNavigation from './Components/Navigation/MainNavigation'

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Switch>
          <Redirect exact from='/' to='/auth' />
          <Route exact path='/auth' component={AuthPage} />
          <Route exact path='/events' component={EventsPage} />
          <Route exact path='/bookings' component={BookingsPage} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
