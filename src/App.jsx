import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import Home from './components/Home/Home.jsx'
import MyProfile from './components/MyProfile/MyProfile.jsx'
import UserDetails from './components/UserDetails/UserDetails.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import NotFound from './components/NotFound/NotFound.jsx'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/users/:userId" element={<UserDetails />} />
      </Route>
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
