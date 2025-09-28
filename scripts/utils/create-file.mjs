import fs from 'node:fs'
import path from 'node:path'

export const createFile = ({ id, fileName, fileContent = '' }) => {
  try {
    const filePath = path.join(process.cwd(), 'logos', id)
    const completeFilePath = path.join(filePath, fileName)

    fs.mkdirSync(filePath, { recursive: true })

    fs.writeFileSync(completeFilePath, fileContent)

    console.info(completeFilePath + ' file saved!!')
  } catch (error) {
    console.error(error)
  }
}
