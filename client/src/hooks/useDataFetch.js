import { useEffect, useState } from "react";
import { getData } from "../Services/NodeService";

const useDataFetch = (url, initial = null, cb = null, params = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initial);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    (async () => {
      const response = await getData(url, controller.signal, params);
      if (response?.canceledError);
      else if (response?.status) {
        setError(response);
        setLoading(false);
      } else {
        setError(null);
        setData(response);
        setLoading(false);
        cb?.(response);
      }
    })();

    return () => controller.abort();
  }, [url, params]);

  return { data, loading, error, setData };
};

export default useDataFetch;