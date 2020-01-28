import { useState, useEffect } from "react"

function useQuery({ url, options = {} }) {
  const [parsedResponse, setParsedResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)

      try {
        const response = await fetch(url, { method: "GET" })
        const success = await response.json()
        setIsFetching(false)
        setParsedResponse(success)
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [url])

  return {
    isFetching,
    error,
    parsedResponse
  }
}

export default useQuery
