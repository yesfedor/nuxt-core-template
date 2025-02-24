import fs from 'node:fs'
import path from 'node:path'
import { consola } from 'consola'
import { addTypeTemplate, createResolver, defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'ui-icon',
  },

  async setup() {
    function* readAllFiles(dir: string): Generator<string> {
      const files = fs.readdirSync(dir, { withFileTypes: true })
      for (const file of files) {
        if (file.isDirectory()) {
          yield * readAllFiles(path.join(dir, file.name))
        }
        else {
          yield path.join(dir, file.name)
        }
      }
    }

    const resolver = createResolver(import.meta.url)
    const iconsDir = resolver.resolve('../../app/assets/icons')
    const filenames = readAllFiles(iconsDir)

    const iconKeys = Array.from(filenames)
      .filter((filePath) => {
        return filePath.endsWith('.svg')
      })
      .map((filePath) => {
        const path = filePath
          .replace(/\\/g, '/')
          .replace('.svg', '')

        const sourceToIcon = 'app/assets/icons'
        const match = path.match(sourceToIcon)
        if (match?.index) {
          return path.slice(match.index + sourceToIcon.length + 1)
        }
        else {
          throw new Error(`Icon error, icon not found: ${filePath}`)
        }
      })

    addTypeTemplate({
      filename: 'types/ui-icon.d.ts',
      getContents: () => {
        return /* ts */`export type TUiIconNames = "${iconKeys.join(' | ')}" | string`
      },
    })

    consola.info('[$uiIcon] icon types successful generated!')
  },
})
