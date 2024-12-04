<script lang="ts" setup>
import 'svg-to-inline/svg-to-inline.js'
import * as changeCase from 'change-case'
import FileSaver from 'file-saver'
import * as prettier from 'prettier'
import prettierPluginHtml from 'prettier/plugins/html'
import CountryFlag from 'vue-country-flag-next'
import flagIso from './FlagIso.json'
import type { Logo, Origins } from '../../server/db/schema'
import './Card.styl'

interface CardProps {
  title: string
  titleTemplate?: string
  link: string
  genres?: string[]
  origins: Origins[]
  logo: Logo
}

const props = defineProps<CardProps>()
const { proxy } = useScriptGoogleAnalytics()

const injectClassName = (svgString: string, classNamesToAdd: string) => {
  const searchClassAttributeRegex = /class="(.*?)"/
  const extractSVGTagRegex = /(<svg[^>]+)/
  const extractSVGUntilClassAttributeRegex = /(<svg[^>]+) class="(.*?)"/

  // Extract SVG classes
  const svgClassNames = svgString.match(searchClassAttributeRegex)?.[1]
  const newClassNames = svgClassNames
    ? `${svgClassNames} ${classNamesToAdd}`
    : classNamesToAdd
  const uniqueClassNames = newClassNames
    .split(' ')
    .filter((className) => className)
    .filter((className, index, self) => self.indexOf(className) === index)
    .join(' ')

  // If SVG doesn't already have a class attribute add it
  if (!svgString.match(searchClassAttributeRegex)) {
    return svgString.replace(
      extractSVGTagRegex,
      `$1 class="${uniqueClassNames}"`,
    )
  }

  return svgString.replace(
    extractSVGUntilClassAttributeRegex,
    `$1 class="${uniqueClassNames}"`,
  )
}

const saveFile = (content: string, filename: string) => {
  const file = new Blob([content], { type: 'image/svg+xml' })
  FileSaver.saveAs(file, filename)

  if (process.env.NODE_ENV === 'production') {
    // @ts-expect-error: broken types form module
    proxy.gtag('event', 'click', {
      event_category: 'download',
      event_label: 'Download SVG',
      value: filename,
    })
  }
}

const handleClick = async ({ logo, title }: { logo: Logo; title: string }) => {
  const filename = `${changeCase.kebabCase(title)}_${changeCase.kebabCase(logo.title)}.svg`
  let svg = null

  try {
    const response = await fetch(logo.svg)
    const svgContent = await response.text()

    if (response.status >= 200 && response.status < 300) {
      svg = svgContent

      if (logo.className) {
        svg = injectClassName(svg, logo.className)
      }

      if (logo.css) {
        const response = await fetch(logo.css)
        const cssContent = await response.text()
        if (response.status >= 200 && response.status < 300) {
          const styles = `<style>\r\n${cssContent}\r</style>`
          const extractSVGTagRegex = /(<svg[^>]+>)/
          svg = svg.replace(extractSVGTagRegex, `$1\r\n${styles}`)
        } else {
          throw new Error(`Fetch failed with status code: ${response.status}`)
        }
      }

      svg = await prettier.format(svg, {
        printWidth: 1000,
        parser: 'html',
        plugins: [prettierPluginHtml],
      })

      saveFile(svg, filename)
    } else {
      throw new Error(`Fetch failed with status code: ${response.status}`)
    }
  } catch (error) {
    window.alert(`error: ${error}`)
  }
}

const { title, link, genres, origins, logo, titleTemplate } = props
</script>

<template>
  <div class="card" :class="{ 'card--inverse': logo.inverse }">
    <!-- eslint-disable vue/attribute-hyphenation -->
    <svg-to-inline
      :key="logo.title"
      class="logo"
      :className="logo.className"
      loading="loading"
      :path="logo.svg"
      lazy
    >
    </svg-to-inline>

    <div class="card__content">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h2 v-if="titleTemplate" class="card__title" v-html="titleTemplate"></h2>

      <h2 v-else class="card__title">
        <a class="card__link" :href="link" :title="`${title}'s website`">
          {{ title }}
        </a>
      </h2>

      <p v-if="genres">
        Genre:
        <template v-for="(genre, index) in genres">
          {{ genre }}
          <template v-if="index < genres.length - 1">•</template>
        </template>
      </p>

      <p>
        Origin:
        <template v-for="(origin, index) in origins" :key="index">
          <CountryFlag :country="flagIso[origin]" />
          {{ origin }}
          <template v-if="index < origins.length - 1">/</template>
        </template>
      </p>
      <p>Reference: {{ logo.title }}</p>
    </div>

    <div class="card__footer">
      <button class="card__button" @click="handleClick({ title, logo })">
        Download SVG
      </button>
    </div>
  </div>
</template>
