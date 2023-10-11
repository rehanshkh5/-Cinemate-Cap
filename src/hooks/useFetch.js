import { useState, useEffect } from "react";

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${`2635e788308af4d02b835bc3e071ef66`}&query=${queryTerm}`;

  useEffect(() => {
    let isMounted = true; // A flag to check if the component is still mounted

    async function fetchMovies() {
      try {
        const response = await fetch(url);

        if (!isMounted) {
          return; // Prevent updating state if the component has unmounted
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        setData(json.results);
        setLoading(false); // Set loading to false when data is fetched successfully
      } catch (error) {
        setError(error); // Handle and set the error state
        setLoading(false); // Set loading to false on error
      }
    }

    fetchMovies();

    // Cleanup function to cancel the fetch if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};
