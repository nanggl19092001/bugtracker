import { useState, useEffect } from "react";
function GetComment(url, reload) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not load data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.data);
        setTotal(data.count);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          setError(err.message);
          setIsLoading(false);
        }
      });
    return () => abortCont.abort();
  }, [url, reload]);

  return { data, isLoading, total, error };
}

export default GetComment;
