import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import UpvoteCount from './Upvotecount';
import { useNavigate } from 'react-router-dom';

const Cards = (props) => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState(props.upvotes || 0); // Initialize votes with props.upvotes

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    console.log('Props in Cards component:', props);
    if (props.image && props.image.data && Array.isArray(props.image.data)) {
      try {
        const base64String = bufferToBase64(props.image.data);
        const imageUrl = `data:${props.image.type};base64,${base64String}`;
        setImageSrc(imageUrl);
        console.log('Image URL:', imageUrl);
      } catch (error) {
        console.error('Error converting image data:', error);
        setImageSrc('');
      }
    } else {
      setImageSrc('');
    }
  }, [props.image]);

  const handleUpvote = () => {
    setVotes(votes + 1);
  };

  const handleViewDetails = () => {
    navigate(`/listing/${props.productId}`);
  };

  const bufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };

  return (
    <Card className="card">
      {imageSrc ? (
        <Card.Img
          variant="top"
          className='card-img'
          src={imageSrc}
          alt="Uploaded Image"
        />
      ) : (
        <Card.Text>No Image Available</Card.Text>
      )}
      <Card.Body>
        <Card.Title>{props.Name}</Card.Title>
        <Card.Text>
          Upvotes: {votes}
        </Card.Text>
        <Button onClick={handleUpvote} variant="primary">
          <FontAwesomeIcon icon={faThumbsUp} /> Upvote <UpvoteCount count={votes} />
        </Button>
        <Button onClick={handleViewDetails} variant="info" className="mt-2">
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;

