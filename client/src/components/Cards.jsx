import React ,{ useState }  from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import UpvoteCount from './Upvotecount';

const Cards = (props) => {
  const [votes, setVotes] = useState(0);

  const handleUpvote = () => {
    setVotes(votes + 1);
  };
  return (
    
    <Card className="card" >
    <Card.Img variant="top" className='card-img' src={props.image} />
    <Card.Body>
      <Card.Title>{props.Name}</Card.Title>
      <Card.Text>
        {props.gender}
      </Card.Text>
      <Button onClick={handleUpvote} variant="primary"><FontAwesomeIcon icon={faThumbsUp}  /> Upvote<UpvoteCount count={votes} /></Button>
      
    </Card.Body>
  </Card>
 
  )
}

export default Cards;
