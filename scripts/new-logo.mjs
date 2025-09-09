import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'

let artist

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

const validateFolder = (input) => {
  try {
    const fileContent = fs.readFileSync(
      path.join(process.cwd(), `src/logos/${input}/${input}.json`),
      'utf-8',
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
      message: 'What is the artist id? (folder name: ./src/logos/<id>)',
      validate: validateFolder,
    },
    {
      type: 'input',
      name: 'logo',
      message: 'What is the logo reference? (where the logo comes from)',
      filter: (input) => input.trim(),
    },
  ])
  .then((answers) => {
    const id = answers.id
    const logo = answers.logo
    const logoHash = logo.toLowerCase().trim().replace(/\s+/g, '-')

    artist.logos.push({
      title: logo,
      svg: `${id}_${logoHash}.svg`,
    })

    // update json
    createFile({
      id,
      fileName: `${id}.json`,
      fileContent: JSON.stringify(artist, null, 2),
    })

    // create svg
    createFile({
      id,
      fileName: `${id}_${logoHash}.svg`,
      fileContent: `<!--
  SVG Music Logos
  ${artist.name} - ${logo} v1.0.0
  https://github.com/tiagoporto/svg-music-logos
  Copyright (c) 2016 Tiago Porto (http://tiagoporto.com)
-->
`,
    })

    return answers
  })
  .catch((error) => {
    console.error('error: ', error)
  })
