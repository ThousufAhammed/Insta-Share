import {Navigate, Outlet} from 'react-router-dom'
import {getJwtToken} from '../../utils/api.js'

const ProtectedRoute = () => {
  const jwtToken = getJwtToken()
  return jwtToken ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
