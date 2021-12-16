import React from 'react';

import spinnerGif from './spinner.gif';

const spinner = () => (
  <>
    <img
      src={spinnerGif}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </>
);

export default spinner;
