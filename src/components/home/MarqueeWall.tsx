import { useState, useEffect, ReactElement } from 'react'
import { IHabit } from '../../api/interface'
import Marquee from 'react-fast-marquee'
import { getTextWidth } from '../../api/utils'
import { useWindowDimension } from '../../hooks/dimension'

const fontBank = ['Josefin Sans', 'Almarai', 'Libre Baskerville', 'Arial']
let rand = (n: number): number => Math.random() * n

function generateLine(arr: any, totalLineWidth: number) {
  let lineArr = []

  for (let i = 0; i < Math.round(totalLineWidth); i++) {
    lineArr.push(
      arr.map(item => <span className={`ml-4 ${rand(1) > 0.9 && 'uppercase'} text-${item.font - 1}xl  font-${item.font}`}>{item.display}</span>)
    )
  }
  return lineArr
}

const MarqueeWall = ({ resource }: any) => {
  const { width, height } = useWindowDimension(300) // 300ms delay
  const [section, setSection] = useState<{ length: number; display: ReactElement }[]>([])
  const [wall, setWall] = useState<any>([])

  useEffect(() => {
    setSection(
      resource.map((item: IHabit) => {
        let fontNum = Math.round(rand(4))

        return {
          length: getTextWidth(item.title + ' ', `30px ${fontBank[fontNum]}`),
          display: item.title,
          font: fontNum,
        }
      })
    )
  }, [resource])

  useEffect(() => {
    if (section.length) {
      //* Formula: screen width / character size * total characters
      let totalLineWidth: number = Math.max(width / section.reduce((a, b) => (a += b.length), 0), 1)
      let wallArr: ReactElement[] = []

      for (let i = 0; i < Math.floor(height / 36); i++) {
        let line = generateLine(section, totalLineWidth)

        wallArr.push(
          <Marquee key={i} className='opacity-50' speed={Math.random() * 300} direction={Math.random() < 0.3 ? 'right' : 'left'}>
            <p key={i} className='text-3xl select-none'>
              {line}
            </p>
          </Marquee>
        )
      }
      setWall(wallArr)
    }
  }, [width, height, section])
  return wall
}

export default MarqueeWall
