import './profile.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../core/store/store'
import { useAppDispatch } from '../../../core/hooks/useStore'
import { authSlice } from '../../auth/auth'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { apiUrl } = useSelector((state: RootState) => state.home)
  const { user } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading...')
  const [userData, setUserData] = useState({} as any)

  useEffect(() => {
    check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const check = async () => {
    try {
      setLoading(true)
      setLoadingMessage('Loading...')
      const data = { id: user.id }
      const response: any = await axios.post(
        `${apiUrl}/user/profile/check`,
        data
      )
      const result = response.data.result
      setUserData(result)
    } catch (err: any) {
      console.warn(err)
      if (err.response?.status === 401) {
        navigate('/error/unauthorized')
      } else {
        toast.warn('Profile check failed!')
      }
    }
    setLoading(false)
  }

  const onRemove: () => Promise<void> = async () => {
    try {
      setLoading(true)
      setLoadingMessage('Removing account...')
      const data = { id: user.id }
      await axios.post(`${apiUrl}/user/profile/remove`, data)
      toast.success('Account removed successfully!')
      dispatch(authSlice.actions.setUser(false))
      navigate('/')
    } catch (err) {
      console.warn(err)
      toast.warn('Account remove failed!')
    }
  }

  return (
    <div className="profile-container animate__animated animate__fadeIn animate__delay-1s">
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faUser} />
          Profile
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress />
            <p>{loadingMessage}</p>
          </div>
        ) : (
          <>
            <div className="text">
              <pre>{JSON.stringify(userData, null, 2)}</pre>
            </div>
            <div
              className="button-remove"
              onClick={() => {
                onRemove()
              }}
            >
              Remove account
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
