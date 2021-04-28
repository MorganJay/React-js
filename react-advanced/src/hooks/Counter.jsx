import React, { useState } from 'react';
import useDocumentTitle from './useDocumentTitle';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useDocumentTitle(`${name} has clicked ${count} ${count === 1 ? ' time' : ' times'}!`);

  return (
    <>
      <input type="text" onChange={e => setName(e.target.value)} />
      <div>
        {name} has clicked {count}
        {count === 1 ? ' time' : ' times'}!
      </div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
};

export default Counter;
