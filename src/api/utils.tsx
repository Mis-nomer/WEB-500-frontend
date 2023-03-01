import { AxiosError } from 'axios'
import { HTMLProps } from 'react'

export function logError(err: AxiosError) {
  let response = err.response
  let specifiedMessage = (response?.data as object | string)?.toString()
  let genericMessage = err.message
  return console.error(specifiedMessage ?? genericMessage)
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */

export function getTextWidth(text: string, font: string): number {
  // re-use canvas object for better performance
  //@ts-ignore
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

function getCssStyle(element: HTMLElement, prop: any) {
  return window.getComputedStyle(element, null).getPropertyValue(prop)
}

function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal'
  const fontSize = getCssStyle(el, 'font-size') || '16px'
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman'

  return `${fontWeight} ${fontSize} ${fontFamily}`
}
