export function useServerOnly(callback: () => void) {
  if (process.server) {
    return callback()
  }
  return false
}
