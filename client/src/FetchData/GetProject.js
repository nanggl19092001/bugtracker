import { useState, useEffect} from "react";


const GetProject = (url, reload) => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
        setCount(data.count);
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

  return { data, count, isLoading, error };
};

export default GetProject;
