import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from '../../features/home'
import Login from '../../features/auth/login'
import Join from '../../features/auth/join'
import Activation from '../../features/auth/activation'
import Recovery from '../../features/auth/recovery'
import Reset from '../../features/auth/reset'
import Profile from '../../features/user/profile'
import Error from '../../features/error'

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Join />} />
        <Route path="/auth/activation/:id" element={<Activation />} />
        <Route path="/auth/activation/:id/:code" element={<Activation />} />
        <Route path="/auth/recovery" element={<Recovery />} />
        <Route path="/auth/reset/:id" element={<Reset />} />
        <Route path="/auth/reset/:id/:code" element={<Reset />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route
          path="/error/unauthorized"
          element={<Error status={401} message="Unauthorized request" />}
        />
        <Route
          path="/error/notfound"
          element={<Error status={404} message="Page not found" />}
        />
        <Route path="*" element={<Navigate to="/error/notfound" replace />} />
      </Routes>
    </div>
  )
}

export default Routing
