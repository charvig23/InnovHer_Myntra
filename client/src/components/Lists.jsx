import React from 'react';
import './Lists.css';

function Lists(props) {
  return (
    <div className="Listing">
      <div className="list-img-top">
        <img
          className="list-img"
          src={props.imageUrl}
          alt="Product Image"
        />
      </div>
      <div className='list-body-box'>
        <div className="list-body">
          <h5 className="list-title">{props.productName}</h5>
          <p className="list-text">{props.productDesc}</p>
          <p className="list-text">{props.productPrice}</p>
        </div>
        <div className="card-body">
          <a href={props.productLink} className="list-link" target='_blank' rel='noopener noreferrer'>View Product</a>
        </div>
      </div>
    </div>
  );
}

export default Lists;

