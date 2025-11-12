export const returnBackgroundOrInverse = (dataInverse?: boolean, dataBackground?: string) => {
  const inverse = dataBackground === undefined ? dataInverse : false
  const backgroundColor = dataBackground ?? false

  return {
    ...(inverse ? { inverse } : {}),
    ...(backgroundColor ? { backgroundColor } : {}),
  }
}
