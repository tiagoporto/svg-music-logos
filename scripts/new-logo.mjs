import inquirer from 'inquirer'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { createFile } from './utils/create-file.mjs'
import { SVGHeader } from './utils/svg-header.mjs'

let artist

const validateFolder = (input) => {
  try {
    const fileContent = fs.readFileSync(
      path.join(process.cwd(), `logos/${input}/${input}.json`),
      'utf8',
    )

    artist = JSON.parse(fileContent)
  } catch {
    return 'Artist id does not exist.'
  }

  return true
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the artist id? (folder name: ./logos/<id>)',
      validate: validateFolder,
    },
    {
      type: 'input',
      name: 'logo',
      message: 'What is the logo reference? (where the logo comes from)',
      filter: input => input.trim(),
    },
  ])
  .then((answers) => {
    const { id, logo } = answers
    const logoHash = logo.toLowerCase().trim().replaceAll(/\s/g, '-')

    artist.logos.push({
      title: logo,
      svg: `${id}_${logoHash}.svg`,
    })

    // update json
    createFile({
      id,
      fileName: `${id}.json`,
      fileContent: JSON.stringify(artist, undefined, 2),
    })

    // create svg
    createFile({
      id,
      fileName: `${id}_${logoHash}.svg`,
      fileContent: SVGHeader({ artist: artist.name, logo }),
    })

    return answers
  })
  .catch((error) => {
    console.error('error:', error)
  })
