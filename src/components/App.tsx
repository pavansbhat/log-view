import React, { useState } from 'react';
const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello from React, TypeScript, and Webpack!</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default App;
