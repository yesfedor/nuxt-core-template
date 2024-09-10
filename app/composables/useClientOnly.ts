export function useClientOnly<T = void>(callback: () => T) {
  if (import.meta.client) {
    return callback()
  }
}

export async function useClientOnlyAsync<T = void>(callback: () => Promise<T>) {
  if (import.meta.client) {
    return await callback()
  }
}
