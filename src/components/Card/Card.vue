<script lang="ts" setup>
import 'svg-to-inline'
import FileSaver from 'file-saver'
import * as prettier from 'prettier'
import prettierPluginHtml from 'prettier/plugins/html'
import CountryFlag from 'vue-country-flag-next'
import flagIso from './FlagIso.json'
import './Card.styl'

interface CardProps {
  title: string
  titleTemplate?: string
  link: string
  genres?: string[]
  origins: string[]
  logo: {}
}

const props = defineProps<CardProps>()

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
  const file = new Blob([content], { type: 'text/plain' })
  FileSaver.saveAs(file, filename)

  // if (process.env.NODE_ENV === 'production') {
  //   this.$ga.event({
  //     eventCategory: 'download',
  //     eventAction: 'click',
  //     eventLabel: filename,
  //   })
  // }
}

const handleClick = async ({ title, logo }) => {
  const logoSplit = logo.svg.split('/')
  const filename = logoSplit[logoSplit.length - 1]
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
    <svg-to-inline
      :key="logo.title"
      class="logo"
      loading="loading"
      :path="logo.svg"
      :className="logo.className"
      lazy
    >
    </svg-to-inline>

    <div class="card__content">
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
        <template v-for="(origin, index) in origins">
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
