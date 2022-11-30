import './error.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

type props = {
  status: number
  message: string
}

const Error = (props: props) => {
  const theme = useSelector((state: any) => state.home.theme)

  return (
    <div
      className={`error-container animate__animated animate__fadeIn animate__delay-1s ${theme}`}
    >
      <div className="content">
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faCircleExclamation} />
          {props.status}
        </div>
        <div className="text">{props.message}</div>
        <div className="text">
          <Link className="button" to="/">
            Go to main page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
