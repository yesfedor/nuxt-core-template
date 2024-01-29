import { useWindowSize } from '@vueuse/core'

export function useSSRWindowSize() {
  if (import.meta.server) {
    const device = useDevice()

    let initialWidth = 0
    let initialHeight = 0

    if (device.isMobile) {
      initialWidth = 360
      initialHeight = 800
    }
    if (device.isTablet) {
      initialWidth = 768
      initialHeight = 1024
    }
    if (device.isDesktop) {
      initialWidth = 1920
      initialHeight = 1080
    }

    return useWindowSize({
      initialWidth,
      initialHeight,
    })
  }

  return useWindowSize()
}
