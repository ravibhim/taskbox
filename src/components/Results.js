import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Ref: https://www.robinwieruch.de/react-hooks-fetch-data
export default function Results() {

  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('google');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=' + query ,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  // Second argument empty array only runs the effect when the component mounts. Otherwise the setData will cause rerender and rerunning of useEffect

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      {isError && <div>Something went wrong ...</div>}

      <div className="page list-items">
        {isLoading ? (
          <div>Loading ...</div>
        ) : (

          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

}
