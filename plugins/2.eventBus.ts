// Doc: https://github.com/developit/mitt
import { consola } from 'consola'
import mitt from 'mitt'

export type ApplicationEvents = {
  /**
   * 'object:event:modification' -> payload type
   * @example 'user:login': User (interface) or type [maybe void]
   */
  'app:layout:created': void
  'app:layout:mounted': void
}

export default defineNuxtPlugin(({ $config }) => {
  const emitter = mitt<ApplicationEvents>()

  if ($config.public.APP_DEBUG) {
    emitter.on('*', (type, e: unknown) => {
      if (e) {
        consola.info(`[$bus]: ${type}`, e)
      } else {
        consola.info(`[$bus]: ${type}`)
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
})
