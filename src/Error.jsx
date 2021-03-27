import React from 'react';

function Error(props) {
  const { error } = props;
  return (
    <div>
      Error:
      {error.message}
    </div>
  );
}

export default Error;
