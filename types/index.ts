declare global {
  const useGtm: () => {
    trackEvent: (event: {
      category?: string
      action?: string
      label?: string
      event?: string
      value?: string
    }) => void
  }
}
