export function useClientOnly(callback: () => void) {
  if (process.client) {
    return callback()
  }
  return false
}
