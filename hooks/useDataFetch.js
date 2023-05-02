import { useEffect, useState } from "react";
import axios from "@/config/axios";
import { CanceledError } from "axios";

const useDataFetch = (
  url,
  initial = null,
  cb = null,
  params = {},
  deps = []
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initial);
  const [hasMore,setHasMore]=useState(false)
 

  useEffect(() => {
    const abortController = new AbortController();
    let response;
    setLoading(true);
    (async () => {
      try {
        if (typeof url === "string"){
          response = await axios.get(url, {
            signal: abortController.signal,
            params,
          });
          setHasMore(response.data.length >= 12);
        }
        else
          response = await Promise.all(
            url.map((url) =>
              axios.get(url, {
                signal: abortController.signal,
                params,
              })
            )
          );
        setError(null);
        if(initial) setData(response.data??response.map(res=>res.data));
        setLoading(false);
        cb?.(response.data??response.map(res=>res.data));
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      }
    })();

    return () => abortController.abort();
  }, [...deps]);

  return { data, loading, error, setData,hasMore,setHasMore };
};

export default useDataFetch;
