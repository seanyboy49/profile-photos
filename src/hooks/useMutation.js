import { useState } from "react";
import request from "../../utils/request";

const useMutation = ({
  url,
  body,
  options = {},
  redirect = false,
  refetch
}) => {
  const [isFetching, setIsFetching] = useState(null);
  const [error, setError] = useState(null);
};
