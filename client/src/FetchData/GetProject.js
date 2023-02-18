import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../Context/HomeContext";


const GetProject = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reload } = useContext(HomeContext)
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
