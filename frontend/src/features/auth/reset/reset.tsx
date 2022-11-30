import './reset.scss'
import { faLifeRing } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../core/store/store'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'

type Inputs = {
  recoveryCode: string
  password: string
  passwordAgain: string
}

const Reset = () => {
  const { apiUrl } = useSelector((state: RootState) => state.home)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm<Inputs>()

  const { id, code } = useParams<{ id: string; code: string }>()

  useEffect(() => {
    if (code) {
      setValue('recoveryCode', code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true)
      await axios.post(`${apiUrl}/auth/local/reset`, {
        id,
        recoveryCode: data.recoveryCode,
        password: data.password,
      })
      toast.success('Password updated!')
      navigate('/auth/login')
    } catch (err) {
      console.warn(err)
      toast.warn('Reset failed!')
    }
    reset()
    setLoading(false)
  }

  return (
    <div className="reset-container animate__animated animate__fadeIn animate__delay-1s">
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faLifeRing} />
          Reset password
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress />
            <p>Resetting password...</p>
          </div>
        ) : (
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <input
              className={`password-input ${
                errors.recoveryCode && 'input-error'
              }`}
              type="text"
              placeholder="Code"
              {...register('recoveryCode', {
                required: true,
                minLength: 4,
              })}
            />
            <input
              className={`password-input ${errors.password && 'input-error'}`}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: 5,
              })}
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
            <input className="button-submit" type="submit" value="Save" />
          </form>
        )}
      </div>
    </div>
  )
}

export default Reset
