import Movie from './hoc/Movie';
import './App.css';
import Counter from './hooks/Counter';
import Users from './hooks/Users';

function App() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Movie id={1} />
      <Counter />
      <Users />
    </div>
  );
}

export default App;
