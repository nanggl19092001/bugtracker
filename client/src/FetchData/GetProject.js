import { useState, useEffect} from "react";


const GetProject = (url, reload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        console.log(res.ok);
        if (!res.ok) {
          throw Error("Could not load data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.data);
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

  return { data, isLoading, error };
};

export default GetProject;
