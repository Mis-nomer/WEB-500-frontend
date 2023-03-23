import { AxiosRequestConfig } from 'axios'
import inst from '../api/instance'
import { createMachine, assign } from 'xstate'
import anime from 'animejs'
import thoughts from '../thoughts'

export const Controller = {
  new: async (url: string, data?: {}, config?: AxiosRequestConfig) => await inst.post(url, data, config),
  read: async (url: string, config?: AxiosRequestConfig) => await inst.get(url, config),
  remove: async (url: string, config?: AxiosRequestConfig) => await inst.delete(url, config),
  update: async (url: string, body: {}, config?: AxiosRequestConfig) => await inst.put(url, body, config),
}

interface IContext {
  loading: boolean
  text: string[]
  boxSetup: boolean
  retry: number
  select: number
}

const defaultContext = {
  loading: true,
  text: thoughts,
  boxSetup: false,
  retry: 0,
  select: 0,
}

const machineSchema = {
  context: {} as IContext,
  events: {} as { type: 'SELECT'; data: number } | { type: 'ACTIVATE' } | { type: 'RENDER' } | { type: 'CLICK' },
}

export const centralMachine = createMachine(
  {
    id: 'centralMachine',
    initial: 'Idle',
    schema: machineSchema,
    context: defaultContext,
    predictableActionArguments: true,
    states: {
      Idle: {
        on: {
          ACTIVATE: 'Render',
        },
      },
      // Loading: {
      //   // @ts-ignore
      //   invoke: {
      //     id: 'getData',
      //     src: () => {
      //       return new Promise(resolve => {
      //         return thoughts
      //       })
      //     },
      //     onDone: {
      //       target: 'Render',
      //       actions: assign({ resource: (_, event) => event.data, loading: false }),
      //     },
      //     onError: {
      //       target: 'Retry',
      //     },
      //   },
      // },
      // Retry: {
      //   entry: ['trackRetry', 'log'],
      //   after: {
      //     1000: [
      //       {
      //         target: 'Render',
      //         cond: 'retryCount',
      //       },
      //       {
      //         target: 'Loading',
      //       },
      //     ],
      //   },
      // },
      Render: {
        entry: ['animateGreet'],
        on: {
          CLICK: 'AnimateSetup',
        },
      },
      AnimateSetup: {
        entry: ['animationSetup'],
        always: 'AnimateSelect',
      },
      AnimateSelect: {
        entry: ['animateSelection'],
        on: [
          { event: 'SELECT', actions: 'changeOption' },
          // { event: 'HOVER', actions: 'hoverSelection' },
          // { event: 'HOVEROUT', actions: 'hoverOutSelection' },
        ],
      },
    },
  },
  {
    actions: {
      log: assign((context: any) => {
        console.log(context)
      }),
      trackRetry: assign({ retry: ctx => ctx.retry + 1 }),
      animateGreet: () => {
        const box = document.querySelector('.box2')
        // const inputBox = document.querySelector('.input-box')
        // const inputContents = document.querySelectorAll('.input-box__content')
        // const inside = document.querySelectorAll('.inside')
        const t = anime.timeline({
          delay: 500,
          direction: 'forwards',
          loop: false,
        })
        t.add({ targets: [box], scale: ['100%', '1000%'], duration: 1250, easing: 'easeOutQuad' })
        // // t.add({ opacity: [0, 1], duration: 500, easing: 'easeInExpo' })
        // t.add({ targets: inputContents, opacity: [0, 1], duration: 250, easing: 'linear' })
      },
      animationSetup: () => {
        const wallWrapper = document.querySelector('.wall-wrapper')
        const inputBoxControl = document.querySelector('.input-box__control')
        const t = anime.timeline({
          targets: wallWrapper,
          direction: 'forwards',
          loop: false,
        })

        t.add({ targets: [inputBoxControl, wallWrapper], opacity: 0, duration: 1000, easing: 'easeOutExpo' })
      },
      animateSelection: () => {
        const t = anime.timeline({
          targets: '.widget li',
          direction: 'forwards',
          loop: false,
        })
        t.add({ opacity: 1, translateY: [-100, 0], delay: anime.stagger(100, { start: 500, easing: 'easeInOutCirc' }) })
        t.add({
          targets: '.widget-divider',
          opacity: 1,
          width: ['0%', '100%'],
          duration: 750,
          easing: 'easeOutQuart',
        })
      },
      changeOption: assign({
        select: (ctx, event) => ctx.select + (event as { type: 'SELECT'; data: number }).data,
      }),
    },
    guards: {
      retryCount: ctx => ctx.retry == 3,
    },
  }
)
