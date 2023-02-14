import { AxiosRequestConfig } from 'axios'
import inst from '../api/instance'
import { createMachine, assign } from 'xstate'
import anime from 'animejs'
import { IHabit } from '../api/interface'
import delay from 'lodash.delay'

export const Controller = {
  add: async (url: string, data?: {}, config?: AxiosRequestConfig) => await inst.post(url, data, config),
  read: async (url: string, config?: AxiosRequestConfig) => await inst.get(url, config),
  delete: async (url: string, config?: AxiosRequestConfig) => await inst.delete(url, config),
  update: async (url: string, body: {}, config?: AxiosRequestConfig) => await inst.put(url, body, config),
}

export const centralMachine = createMachine(
  {
    predictableActionArguments: true,
    schema: {
      context: {} as {
        loading: boolean
        resource: any[]
        text: string[]
        boxSetup: boolean
      },
      events: {} as { type: 'ACTIVATE' } | { type: 'RENDER' } | { type: 'CLICK' },
    },
    id: 'centralMachine',
    initial: 'Idle',
    context: {
      loading: true,
      resource: [], // data pulling from API
      text: [],
      boxSetup: false,
    },
    states: {
      Idle: {
        on: {
          ACTIVATE: 'Loading',
        },
      },
      Loading: {
        // @ts-ignore
        invoke: {
          id: 'getData',
          src: () => {
            // const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            // return Controller.read('/data/habit/', config).then(res => res.data)
            return Controller.read('/box').then(res => res.data)
          },
          onDone: {
            target: 'Render',
            actions: assign({ resource: (_, event) => event.data, loading: false }),
          },
          onError: {
            target: 'Retry',
          },
        },
      },
      Retry: {
        after: {
          3000: 'Loading',
        },
      },
      Render: {
        entry: ['processData', 'animateGreet'],
        on: {
          CLICK: 'AnimateSetup',
        },
      },
      AnimateSetup: {
        entry: ['animateSetup'],
        exit: 'dataCleanUp',
        after: {
          1000: 'AnimateSelect', // animateSetup runs for 1s
        },
      },
      AnimateSelect: {
        entry: ['animateSelection'],
      },
    },
  },
  {
    actions: {
      log: assign((context: any) => {
        console.log(context)
      }),
      animateGreet: () => {
        const inputBox = document.querySelector('.input-box')
        const inputContents = document.querySelectorAll('.input-box__content')
        const t = anime.timeline({
          delay: 500,
          targets: inputBox,
          direction: 'forwards',
          loop: false,
        })

        t.add({ width: '0', opacity: 0, duration: 500, easing: 'linear' })
        t.add({ width: '40vmin', opacity: 1, duration: 250, easing: 'spring' })
        t.add({ targets: inputContents, opacity: 1, duration: 250, easing: 'spring' })
        t.play()
      },
      dataCleanUp: assign({ resource: [], text: [], boxSetup: true }),
      animateSetup: () => {
        const wallWrapper = document.querySelector('.wall-wrapper')
        const inputBoxControl = document.querySelector('.input-box__control')
        const t = anime.timeline({
          targets: wallWrapper,
          direction: 'forwards',
          loop: false,
        })

        t.add({ targets: [inputBoxControl, wallWrapper], opacity: 0, duration: 1000, easing: 'easeOutExpo' })
        t.play()
      },
      animateSelection: () => {
        const widget = document.querySelectorAll('.widget li')

        const t = anime.timeline({
          delay: 1000,
          targets: widget,
          direction: 'forwards',
          loop: false,
        })
        t.add({ translateY: '-100px', duration: 1000, easing: 'linear' })
        // t.add({ targets: '.widget li', translateY: 0, duration: 1000, elasticity: 100 })

        t.play()
      },
      processData: assign({
        text: ctx => ctx.resource.map((data: IHabit) => data?.title),
      }),
    },
  }
)
