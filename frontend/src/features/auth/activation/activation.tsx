import './activation.scss'
import { faUser } from '@fortawesome/free-solid-svg-icons'
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
  activationCode: string
}

const Activation = () => {
  const { apiUrl } = useSelector((state: RootState) => state.home)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Activating...')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>()

  const { id, code } = useParams<{ id: string; code: string }>()

  useEffect(() => {
    if (code) {
      setValue('activationCode', code)
      handleSubmit(onSubmit)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true)
      setLoadingMessage('Activating...')
      await axios.post(`${apiUrl}/auth/local/activate`, {
        id,
        activationCode: data.activationCode,
      })
      toast.success('Account activated!')
      navigate('/auth/login')
    } catch (err) {
      console.warn(err)
      toast.warn('Activation failed!')
    }
    reset()
    setLoading(false)
  }

  const onResend: () => Promise<void> = async () => {
    try {
      setLoading(true)
      setLoadingMessage('Resending...')
      await axios.post(`${apiUrl}/auth/local/resend`, {
        id,
      })
      toast.success('Check your emails!')
    } catch (err) {
      console.warn(err)
      toast.warn('Resend failed!')
    }
    reset()
    setLoading(false)
  }

  return (
    <div className="activation-container animate__animated animate__fadeIn animate__delay-1s">
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faUser} />
          Activation
        </div>
        {loading ? (
          <div className="loader">
            <CircularProgress />
            <p>{loadingMessage}</p>
          </div>
        ) : (
          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <input
              className={`password-input ${
                errors.activationCode && 'input-error'
              }`}
              type="text"
              placeholder="Activation code"
              {...register('activationCode', {
                required: true,
                minLength: 4,
              })}
            />
            <input className="button-submit" type="submit" value="Activate" />
            <div
              className="button-resend"
              onClick={() => {
                onResend()
              }}
            >
              Resend email
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Activation
