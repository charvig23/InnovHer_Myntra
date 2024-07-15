import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';
import { Circles } from 'react-loader-spinner';

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
          const sortedEntries = data.data.sort((a, b) => b.upvotes - a.upvotes);
          setEntries(sortedEntries);
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Circles
          height="80"
          width="80"
          color="#FF0090"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const topEntry = entries[0];
  const otherEntries = entries.slice(1);
  return (
    <div className="card-container">
       {topEntry && (
        <div className="top-card">
          <Cards
            customLabel="Top Performer"
            key={topEntry._id}
            image={topEntry.uploaded_images.length > 0 ? topEntry.uploaded_images[0].data : ''}
            Name={topEntry.name}
            productId={topEntry._id}
            upvotes={topEntry.upvotes}
          />
        </div>
      )}

<div className="other-cards">
        {otherEntries.map((entry, index) => (
          <Cards
            key={entry._id}
            image={entry.uploaded_images.length > 0 ? entry.uploaded_images[0].data : ''}
            Name={entry.name}
            productId={entry._id}
            upvotes={entry.upvotes}
          />
        ))}
      </div>
    </div>
  );
}

export default VotingPage;

