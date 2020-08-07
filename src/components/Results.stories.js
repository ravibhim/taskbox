import React from 'react';
import { storiesOf } from '@storybook/react';

import  axios from 'axios';
import  MockAdapter from 'axios-mock-adapter';

import Results from './Results';

const mock = new MockAdapter(axios);

const API_REQUEST = 'https://hn.algolia.com/api/v1/search?query=google';

export default {
  component: Results,
  title: 'Results',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const resultsData = {
    hits: [
      {objectID: 'ID1', url: 'URL', title: 'Google Title 1'},
      {objectID: 'ID2', url: 'URL', title: 'Google Title 2'},
    ]
};

storiesOf('Results (Mocked)', module)
  .add('Default', () => {
    // create the mock inside the story
    // if this is outside it'll mess up with other axios instances/requests
    var mock_response = {...resultsData};
    mock.onGet(API_REQUEST).reply(200, mock_response);

    return <Results />
  });

// export const Default = () => <Results />;
