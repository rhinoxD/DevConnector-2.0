import React from 'react';

import spinnerGif from './spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinnerGif}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </>
);

export default Spinner;
