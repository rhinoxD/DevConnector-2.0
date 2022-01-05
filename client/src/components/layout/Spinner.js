import React from 'react';

import spin from './spin.gif';

const Spinner = () => (
  <>
    <img
      src={spin}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </>
);

export default Spinner;
