export interface TheCatApiItem {
  id: string
  url: string
  width: number
  height: number
}

export async function apiGetImageFromTheCatApi() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search')
  return await response.json() as TheCatApiItem[]
}

export async function useCatCatalog() {
  const cats = await useAsyncData('api:cats', async () => await apiGetImageFromTheCatApi())

  const first = computed(() => {
    return cats.data.value ? cats.data.value[0] : null
  })

  return {
    cats,
    first,
  }
}
