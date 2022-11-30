import './background.scss'
import { useState } from 'react'

const Background = () => {
  // List of alternative colored squares
  const [squareAltList, setsquareAltList] = useState([false] as any)

  /**
   * Toggle square color
   * @param index number
   */
  const toggleSquareColor = (index: number) => {
    let temp = [...squareAltList]
    temp[index] = !temp[index]
    setsquareAltList(temp)
  }

  return (
    <div className="background-container" data-testid="background">
      <ul className="content">
        {Array(10)
          .fill(1)
          .map((item, i) => (
            <li
              key={i}
              className={`${squareAltList[i] && 'alt'}`}
              onClick={() => {
                toggleSquareColor(i)
              }}
            ></li>
          ))}
      </ul>
    </div>
  )
}

export default Background
