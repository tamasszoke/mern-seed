const useConfig = () => {
  /**
   * Get the backend url
   * @returns string
   */
  const getApiUrl = () => {
    const host = process.env.REACT_APP_BACKEND_HOST
    const port = process.env.REACT_APP_BACKEND_PORT
    const url = `https://${host}:${port}/api`
    return url
  }

  return { getApiUrl }
}

export default useConfig
