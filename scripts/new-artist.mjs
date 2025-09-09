import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'

const createFile = ({ id, fileName, fileContent = '' }) => {
  try {
    const filePath = path.join(process.cwd(), 'src/logos', id)
    const completeFilePath = path.join(filePath, fileName)

    fs.mkdirSync(filePath, { recursive: true })

    fs.writeFileSync(completeFilePath, fileContent)

    console.info(completeFilePath + ' file saved!!')
  } catch (error) {
    console.error(error)
  }
}

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
    const name = answers.name
    const id = name.toLowerCase().trim().replace(/\s+/g, '-')
    const origins = answers.origins
    const genres = answers.genres
    const link = answers.link
    const logo = answers.logo
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
      fileContent: `<!--
  SVG Music Logos
  ${name} - ${logo} v1.0.0
  https://github.com/tiagoporto/svg-music-logos
  Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
-->`,
    })

    return answers
  })
  .catch((error) => {
    console.error('error: ', error)
  })
