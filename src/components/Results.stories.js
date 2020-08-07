import React from 'react';
import { storiesOf } from '@storybook/react';

import  axios from 'axios';
import  MockAdapter from 'axios-mock-adapter';

import Results from './Results';

// https://github.com/ctimmerm/axios-mock-adapter
//const mock = new MockAdapter(axios, {delayResponse: 400, onNoMatch: "passthrough"});
const mock = new MockAdapter(axios, {delayResponse: 400});

const GOOGLE_API_REQUEST = 'https://hn.algolia.com/api/v1/search?query=google';
const YAHOO_API_REQUEST = 'https://hn.algolia.com/api/v1/search?query=yahoo';

export default {
  component: Results,
  title: 'Results',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const resultsGoogleData = {
    hits: [
      {objectID: 'ID1', url: 'URL', title: 'Google Title 1'},
      {objectID: 'ID2', url: 'URL', title: 'Google Title 2'},
    ]
};

export const resultsYahooData = {
    hits: [
      {objectID: 'ID1', url: 'URL', title: 'Yahoo Title 1'},
      {objectID: 'ID2', url: 'URL', title: 'Yahoo Title 2'},
    ]
};

storiesOf('Results (Mocked)', module)
  .add('Default', () => {
    // create the mock inside the story
    // if this is outside it'll mess up with other axios instances/requests
    mock.onGet(GOOGLE_API_REQUEST).reply(200, {...resultsGoogleData})
      .onGet(YAHOO_API_REQUEST).reply(200, {...resultsYahooData});

    return <Results />
  });

// export const Default = () => <Results />;
