import {Main} from './pages/Main'
import {SignUp} from './pages/SignUp'
import {SignIn} from './pages/SignIn'

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ScrollRestore} from './Components/ScrollRestore'
import HeroDashboard from './pages/HeroDashboard'
import HeroProtectedRoutes from './utils/HeroProtectedRoutes'
import UserProfile from './pages/UserProfile'
import UserProtectedRoutes from './utils/UserProtectedRoutes'

function App() {
  return (
    <>
      <Router>
        <ScrollRestore />
        <Routes>
          <Route path="/" element={<Main />} exact />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />

          <Route path="/*" element={ <HeroProtectedRoutes />} >
            <Route path="hero-dashboard" element={ <HeroDashboard />} />
          </Route>

          <Route path="/*" element={ < UserProtectedRoutes />} >
            <Route path="userProfile" element={ <UserProfile />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}
export default App
