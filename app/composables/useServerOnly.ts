export function useServerOnly<T = void>(callback: () => T) {
  if (import.meta.server) {
    return callback()
  }
}

export async function useServerOnlyAsync<T = void>(callback: () => Promise<T>) {
  if (import.meta.server) {
    return await callback()
  }
}
