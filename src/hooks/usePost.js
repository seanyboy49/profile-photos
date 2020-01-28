import { useState, useEffect } from "react"

function usePost({ url, data, redirect = false, refetch = "", options = {} }) {
  const [parsedResponse, setParsedResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data)
        })
        const success = await response.json()
        setIsFetching(false)
        setParsedResponse(success)
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [url, data])

  return {
    isFetching,
    error,
    parsedResponse
  }
}

export default usePost
