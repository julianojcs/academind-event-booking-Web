import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { UserStorage } from './UserContext'
import PageNotFound from './Pages/404'
import AuthPage from './Pages/Auth'
import BookingsPage from './Pages/Booking'
import EventsPage from './Pages/Events'
import Header from './Components/Header'
import Footer from './Components/Footer'
import ProtectedRoute from './Helper/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <main>
          <Switch>
            <Redirect exact from='/' to='/auth' />
            <Route exact path='/auth' component={AuthPage} />
            <Route exact path='/events' component={EventsPage} />
            <ProtectedRoute exact path='/bookings' component={BookingsPage} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </main>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
