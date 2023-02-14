import React, { useState, useEffect, ReactElement } from 'react'
import Marquee from 'react-fast-marquee'
import { getTextWidth } from '../api/utils'
import { useWindowDimension } from '../hooks/dimension'

interface ISection {
  length: number
  value: string
  font: string
  size: number
}

const fontBank = ['Josefin Sans', 'Almarai', 'Libre Baskerville', 'Arial']
const rand = (n: number = 1, min: number = 0): number => Math.max(Math.random() * n, min)

function generateLine(arr: ISection[], totalLineWidth: number = 1) {
  let maxFontSize = 0
  let display: ReactElement[] = arr.map((item, i) => {
    maxFontSize = item.size > maxFontSize ? item.size : maxFontSize
    return (
      <span key={i} style={{ fontSize: item.size, fontFamily: item.font }} className={`ml-4 ${rand() > 0.7 && 'uppercase'}`}>
        {item.value}
      </span>
    )
  })

  return { display: Array(totalLineWidth).fill(display), maxFontSize }
}

function generateSection(text: string[]): ISection[] {
  return text.map(t => {
    let fontType = fontBank[Math.round(rand(3))]
    let fontSize = Math.round(rand(40, 24))

    return {
      length: getTextWidth(t, `${fontSize}px ${fontType}`),
      value: t,
      font: fontType,
      size: fontSize,
    }
  })
}

function generateWall(source: ReactElement[], fontHeight: number, windowHeight: number) {
  let wallArr: ReactElement[] = []
  let i = 0,
    cond = Math.floor(windowHeight / fontHeight)
  while (i++ < cond)
    wallArr.push(
      <Marquee key={i} className='opacity-50' speed={rand(300, 50)} direction={Math.random() < 0.3 ? 'right' : 'left'}>
        <p key={1} className='text-3xl select-none'>
          {source}
        </p>
      </Marquee>
    )
  return wallArr
}

const MarqueeWall = ({ resource }: any) => {
  const { width, height } = useWindowDimension(300) // 300ms delay
  const [textWall, setTextWall] = useState<ReactElement[]>()

  useEffect(() => {
    if (resource.length) {
      let section = generateSection(resource)
      //* Formula: screen width / character size * total characters
      // This is to ensure Marquee line won't end abruptly, but form a long continuous string
      const totalLineWidth = section.reduce((a, b) => (a += b.length), 0)
      const totalDupes = Math.ceil(width / totalLineWidth)
      const line = generateLine(section, totalDupes)
      const wall = generateWall(line.display, line.maxFontSize, height)

      setTextWall(wall)
    }
  }, [resource])

  return <div className='wall-wrapper'>{textWall}</div>
}

export default MarqueeWall
