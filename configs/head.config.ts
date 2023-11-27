import type { NuxtOptions } from '@nuxt/schema'

export default {
  'meta': [
    {
      'name': 'viewport',
      'content': 'width=device-width, initial-scale=1',
    },
    {
      'charset': 'utf-8',
    },
  ],
  'link': [],
  'style': [],
  'script': [],
  'noscript': [],
} as NuxtOptions['app']['head']
