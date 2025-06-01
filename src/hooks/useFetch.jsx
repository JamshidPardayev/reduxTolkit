import { useEffect, useState } from "react";
import { api } from "../api";

export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(endpoint.startsWith("/") ? endpoint : `/${endpoint}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);
  return { data, error, loading };
};
