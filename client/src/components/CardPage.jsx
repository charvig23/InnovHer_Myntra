import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';

function VotingPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/entries'); 
        const data = response.data;
        console.log(data);
        if (data.success) {
          setEntries(data.data);
          setLoading(false);
        } else {
          setError(data.message || 'Error fetching entries');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
        setError(error.message || 'Server error');
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card-container">
      {entries.map((entry, index) => (
        <Cards
          key={entry._id}
          image={entry.uploaded_images.length > 0 ? entry.uploaded_images[0].data : ''}
          Name={entry.name}
          productId={entry._id} 
          upvotes={entry.upvotes} 
        />
      ))}
    </div>
  );
}

export default VotingPage;

