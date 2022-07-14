import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchBox } from './components/SearchBox/SearchBox';
import { CardList } from './components/CardList/CardList';
const url = 'https://jsonplaceholder.typicode.com/users';
function App() {
  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMonsters = async () => {
    try {
      const response = await fetch(url);
      const monsters = await response.json();
      //console.log(monsters);
      setMonsters(monsters);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, []);
  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;
  }
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="App">
      <h1>Monster's Home</h1>
      <SearchBox placeholder="search monsters..." handleChange={handleChange} />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
