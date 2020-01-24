import { useState } from "react";

async function useQuery({ url, options = {} }) {
  const [isFetching, setIsFetching] = useState(null);
  const [error, setError] = useState(null);
  const [parsedResponse, setParsedResponse] = useState(null);

  const response = await fetch(url, { method: "GET" });
  const success = await response.json();
  setParsedResponse(success);
  console.log(parsedResponse);
  // try {
  // } catch (err) {
  //   setError(err);
  // }

  return {
    isFetching,
    error,
    parsedResponse
  };
}

export default useQuery;
