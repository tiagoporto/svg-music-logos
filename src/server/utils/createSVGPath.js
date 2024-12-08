import * as changeCase from 'change-case'

export const createSVGPath = ({ id, title }) => {
  const filename = `${id}_${changeCase.kebabCase(title)}.svg`
  const path = `/logos/${id}/${filename}`

  return path
}
