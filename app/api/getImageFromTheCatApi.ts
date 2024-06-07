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
