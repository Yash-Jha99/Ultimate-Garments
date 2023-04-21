import { useEffect, useState } from "react";
import { getData } from "../Services/NodeService";

const useDataFetch = (url, initial, cb = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initial);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    (async () => {
      const response = await getData(url, controller.signal);
      if (!response?.error) setLoading(false);
      if (response?.error) {
        setError(response);
      } else {
        setError(null);
        setData(response);
        if (cb) cb(response);
      }
    })();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useDataFetch;
