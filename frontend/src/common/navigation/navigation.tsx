import './navigation.scss'
import homeSlice from '../../features/home/home.slice'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../core/store/store'
import { useAppDispatch } from '../../core/hooks/useStore'
import { authSlice } from '../../features/auth/auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleQuestion,
  faHome,
  faMoon,
  faRightFromBracket,
  faSun,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const { apiUrl, theme } = useSelector((state: RootState) => state.home)
  const { user } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  const switchTheme = () => {
    dispatch(homeSlice.actions.switchTheme())
  }

  const onLogout = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/local/logout`)
      if (response.data?.success) {
        dispatch(authSlice.actions.setUser(false))
        toast.success('Logged out successfully!')
      } else {
        dispatch(authSlice.actions.setUser(false))
        toast.warn('Logout failed!')
      }
    } catch (err) {
      console.warn(err)
    }
    navigate('/')
  }

  return (
    <div className="navigation-container">
      <Link className="button animate__animated animate__bounceIn" to="/">
        <FontAwesomeIcon className="icon" icon={faHome} />
        Home
      </Link>
      {user.email ? (
        <>
          <Link
            className="button animate__animated animate__bounceIn"
            to="/user/profile"
          >
            <FontAwesomeIcon className="icon" icon={faUser} />
            Profile
          </Link>
          <div
            className="button animate__animated animate__bounceIn"
            onClick={() => {
              onLogout()
            }}
          >
            <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
            Logout
          </div>
        </>
      ) : (
        <>
          <Link
            className="button animate__animated animate__bounceIn"
            to="/auth/login"
          >
            <FontAwesomeIcon className="icon" icon={faUser} />
            Login
          </Link>
          <Link
            className="button animate__animated animate__bounceIn"
            to="/auth/join"
          >
            <FontAwesomeIcon className="icon" icon={faUserPlus} />
            Join
          </Link>
          <Link
            className="button animate__animated animate__bounceIn"
            to="/auth/recovery"
          >
            <FontAwesomeIcon className="icon" icon={faCircleQuestion} />
            Recovery
          </Link>
        </>
      )}
      <>
        {theme === 'theme-light' ? (
          <FontAwesomeIcon
            icon={faMoon}
            className="button theme icon animate__animated animate__bounceInRight"
            onClick={switchTheme}
            data-testid="theme-dark-button"
          />
        ) : (
          <FontAwesomeIcon
            icon={faSun}
            className="button theme icon animate__animated animate__bounceInRight"
            onClick={switchTheme}
            data-testid="theme-light-button"
          />
        )}
      </>
    </div>
  )
}

export default Navigation
