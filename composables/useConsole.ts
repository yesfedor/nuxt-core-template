import { consola } from 'consola'

export default function useConsole() {
	const nuxtApp = useRuntimeConfig()
	const canConsole = () => {
		return nuxtApp.public.APP_DEBUG && !nuxtApp.public.APP_IS_PROD
	}

	type TCallConsoleType = 'log' | 'info' | 'warn' | 'error'
	const callConsole = (type: TCallConsoleType, structure: string, message?: string, ...args: any[]) => {
		if (!canConsole()) {
			return false
		}
		consola[type](`[${structure}]: ${message}`, ...args)
		return true
	}

	return {
		log(structure: string, message: string, ...args: any[]) {
			callConsole('log', structure, message, ...args)
		},
		info(structure: string, message: string, ...args: any[]) {
			callConsole('info', structure, message, ...args)
		},
		warn(structure: string, message: string, ...args: any[]) {
			callConsole('warn', structure, message, ...args)
		},
		error(structure: string, message: string, ...args: any[]) {
			callConsole('error', structure, message, ...args)
		},
	}
}
