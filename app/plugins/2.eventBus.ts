// Doc: https://github.com/developit/mitt
import mitt from 'mitt'
import { isString } from 'es-toolkit'

export interface ApplicationEvents {
  /**
   * 'object:event:modification' -> payload type
   * @example 'user:login': User (interface) or type [maybe void]
   */
  'app:layout:created': ReturnType<() => void>
  'app:layout:mounted': ReturnType<() => void>
  [key: string | symbol]: ReturnType<() => void>
}

export default defineNuxtPlugin({
  name: 'app:eventBus',

  async setup({ $config }) {
    const emitter = mitt<ApplicationEvents>()
    const logger = useConsole()

    if (!$config.public.APP_IS_PROD && $config.public.APP_DEBUG) {
      emitter.on('*', (type, e: unknown) => {
        if (!isString(type)) {
          return logger.info('bus', type.toString(), e)
        }
        if (e) {
          logger.info('bus', `${type}`, e)
        }
        else {
          logger.info('bus', `${type}`)
        }
      })
    }

    return {
      provide: {
        bus: {
          emit: emitter.emit,
          on: emitter.on,
          off: emitter.off,
        },
      },
    }
  },
})
