import { AxiosRequestConfig } from 'axios'
import inst from '../api/instance'
import { createMachine, assign } from 'xstate'
import anime from 'animejs'
import { IHabit } from '../api/interface'
export const Controller = {
  add: async (url: string, data?: {}, config?: AxiosRequestConfig) => await inst.post(url, data, config),
  read: async (url: string, config?: AxiosRequestConfig) => await inst.get(url, config),
  delete: async (url: string, config?: AxiosRequestConfig) => await inst.delete(url, config),
  update: async (url: string, body: {}, config?: AxiosRequestConfig) => await inst.put(url, body, config),
}

export const centralMachine = createMachine(
  {
    id: 'centralMachine',
    initial: 'Idle',
    context: {
      loading: true,
      resource: [], // data pulling from API
      text: [],
      cleanup: false,
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
          4000: 'Loading',
        },
      },
      Render: {
        entry: ['processData'],
        after: {
          1000: 'AnimateInit',
        },
      },
      AnimateInit: {
        entry: ['animate'],
        on: {
          CLICK: 'CreateBox',
        },
      },
      CreateBox: {
        entry: ['cleanup', 'log'],
      },
    },
  },
  {
    actions: {
      log: assign((context: any) => {
        console.log(context)
      }),
      animate: () => {
        const inputBox = document.querySelector('.input-box')
        const inputContent = document.querySelectorAll('.input-box__content')
        const t = anime.timeline({
          targets: inputBox,
          direction: 'forwards',
          loop: false,
        })

        t.add({ width: '0', opacity: 0, duration: 100, easing: 'linear' })
        t.add({ width: '40vmin', opacity: 1, duration: 250, easing: 'spring' })
        t.add({ targets: inputContent, opacity: 1, duration: 250, easing: 'spring' }, '+=250')
        t.play()
      },
      cleanup: assign({ resource: [], cleanup: true }),
      processData: assign({
        //@ts-ignore
        text: ctx => ctx.resource.map((data: IHabit) => data?.title),
      }),
    },
  }
)
