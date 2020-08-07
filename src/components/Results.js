import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Results() {

  const [data, setData] = useState({ hits: [] });

  // Second argument empty array only runs the effect when the component mounts. Otherwise the setData will cause rerender and rerunning of useEffect

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=google',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="page list-items">
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );

}
