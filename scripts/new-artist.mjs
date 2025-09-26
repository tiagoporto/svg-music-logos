import inquirer from 'inquirer'

import { createFile } from './utils/create-file.mjs'
import { SVGHeader } from './utils/svg-header.mjs'

const filterComma = (input) => {
  return input.split(',').map((item) => item.trim())
}

const validateEmptyString = (input) => {
  if (input.trim() === '') {
    return 'Required field, please enter a value.'
  }
  return true
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the artist name? (e.g. The Rolling Stones)',
      validate: validateEmptyString,
    },
    {
      type: 'input',
      name: 'origins',
      message:
        'What is the artist origins? (Separate by commas) (e.g. England)',
      filter: filterComma,
      validate: validateEmptyString,
    },
    {
      type: 'input',
      name: 'genres',
      message: 'What is the artist genres? (Separate by commas) (e.g. Rock)',
      filter: filterComma,
    },
    {
      type: 'input',
      name: 'link',
      message: 'What is the artist link? (e.g. https://rollingstones.com',
      filter: (input) => input.trim().toLowerCase(),
      validate: validateEmptyString,
    },
    {
      type: 'input',
      name: 'logo',
      message: 'What is the logo reference? (e.g. Flashpoint)',
      filter: (input) => input.trim(),
    },
  ])
  .then((answers) => {
    const { origins, genres, link, name, logo } = answers
    const id = name.toLowerCase().trim().replace(/\s+/g, '-')
    const logoHash = logo.toLowerCase().trim().replace(/\s+/g, '-')

    // create json
    createFile({
      id,
      fileName: `${id}.json`,
      fileContent: JSON.stringify(
        {
          id,
          name,
          origins,
          genres,
          link,
          logos: [
            {
              title: logo,
              svg: `${id}_${logoHash}.svg`,
            },
          ],
        },
        null,
        2,
      ),
    })

    // create svg
    createFile({
      id,
      fileName: `${id}_${logoHash}.svg`,
      fileContent: SVGHeader({ artist: name, logo }),
    })

    return answers
  })
  .catch((error) => {
    console.error('error:', error)
  })
