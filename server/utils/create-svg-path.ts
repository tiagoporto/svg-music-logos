import * as changeCase from 'change-case'

export const createSVGPath = ({ id, title }: { id: string; title: string }) => {
  const filename = `${id}_${changeCase.kebabCase(title)}.svg`
  const path = `/logos/${id}/${filename}`

  return path
}
