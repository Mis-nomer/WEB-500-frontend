import { AxiosRequestConfig, ResponseType } from 'axios'
import inst from '../api/instance'
import { StateMachine, createMachine, assign, ContextFrom } from 'xstate'
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
            const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            return Controller.read('/data/habit/', config).then(res => res.data)
          },
          onDone: {
            target: 'MainInit',
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
      MainInit: {
        entry: ['processData'],
      },
    },
  },
  {
    actions: {
      log: assign((context: any) => {
        console.log(context)
      }),
      processData: assign({
        //@ts-ignore
        text: ctx => ctx.resource.map((data: IHabit) => data?.title),
      }),
    },
  }
)
