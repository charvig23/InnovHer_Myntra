import { useState, useEffect } from 'react';
import './App.css';
import Lists from './components/Lists';

function ListingsPage() {
  const [users, setUsers] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await fetch('/MOCK.json'); 
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className='card-container'>
      {users.map(user => (
        <Lists  key={user.id} Name={user.Name} gender={user.gender} image ={user.image}/>
      ))}
    </div>
  );
}

export default ListingsPage;