import React, { useEffect, useState } from 'react';
const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchAllLogsData = async () => {
      const response = await fetch('/api/v1/logs');
      const data = await response.json();
      return data;
    };
    fetchAllLogsData().then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>Hello from React, TypeScript, and Webpack!</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount((prevCount: number) => prevCount + 1)}>Click me</button>
    </div>
  );
};

export default App;
