import './join.scss'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../core/store/store'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'

type Inputs = {
  email: string
  password: string
  passwordAgain: string
}

const Join = () => {
  const { apiUrl } = useSelector((state: RootState) => state.home)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true)
      const response = await axios.put(`${apiUrl}/auth/local/join`, data)
      toast.success('Joined successfully!')
      toast.info('Check your emails!')
      navigate(`/auth/activation/${response.data.result.id}`)
    } catch (err) {
      console.warn(err)
      toast.warn('Join failed!')
    }
    reset()
    setLoading(false)
  }

  return (
    <div className="join-container animate__animated animate__fadeIn animate__delay-1s">
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faUserPlus} />
          Join
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress />
            <p>Joining...</p>
          </div>
        ) : (
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <input
              className={`text-input ${errors.email && 'input-error'}`}
              type="text"
              placeholder="Email"
              {...register('email', {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <input
              className={`password-input ${errors.password && 'input-error'}`}
              type="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 5 })}
            />
            <input
              className={`password-input ${
                errors.passwordAgain && 'input-error'
              }`}
              type="password"
              placeholder="Password again"
              {...register('passwordAgain', {
                required: 'Please confirm password!',
                minLength: 5,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues()
                    return password === value || 'Passwords should match!'
                  },
                },
              })}
            />
            <input className="button-submit" type="submit" value="Join" />
          </form>
        )}
      </div>
    </div>
  )
}

export default Join
