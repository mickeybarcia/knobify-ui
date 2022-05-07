import React, { useEffect, useState } from 'react';

const Test: React.FC = () => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => undefined, []);

  return (
    <div>
      <p>Test</p>
    </div>
  );
};

export default Test;
