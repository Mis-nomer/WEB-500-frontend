import { useState, useEffect, ReactElement } from 'react'
import { IHabit } from '../../api/interface'
import Marquee from 'react-fast-marquee'
import { getTextWidth } from '../../api/utils'
import { useWindowDimension } from '../../hooks/dimension'

const fontBank = ['Josefin Sans', 'Almarai', 'Libre Baskerville', 'Arial']

const MarqueeWall = ({ resource }: any) => {
  const { width, height } = useWindowDimension(300) // 300ms delay
  const [line, setLine] = useState<{ length: number; display: ReactElement }[]>([])
  const [wall, setWall] = useState<any>([])

  useEffect(() => {
    let rand = () => Math.ceil(Math.random() * 100)

    setLine(
      resource.map((item: IHabit) => {
        return {
          length: getTextWidth(item.title + ' ', `30px ${fontBank[1]}`),
          display: (
            <p key={rand()} className='text-3xl ml-4 font-1 select-none'>
              {item.title}
            </p>
          ),
        }
      })
    )
  }, [])

  useEffect(() => {
    if (line.length) {
      //3xl = 30px + 36px line height
      //* Formula: screen width / character size * total characters
      let totalLineWidth = width / line.reduce((a, b) => (a += b.length), 0)
      let lineArr = []
      for (let i = 0; i < Math.round(totalLineWidth); i++) {
        lineArr.push(line.map(item => item.display))
      }
      setWall(lineArr)
    }
  }, [width, line])
  return <Marquee speed={200}>{wall && wall.map((item: ReactElement) => item)}</Marquee>
}

export default MarqueeWall
