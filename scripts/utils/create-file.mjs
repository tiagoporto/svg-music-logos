import fs from 'fs'
import path from 'path'

export const createFile = ({ id, fileName, fileContent = '' }) => {
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
