import React from 'react';
import './Lists.css';

function Lists(props) {
  return (
    <div className="Listing" >
        <div className="list-img-top" >
      <img
        className="list-img"
        src = {props.image}
        alt="Card image cap"
      />
      </div>
      <div className='list-body-box'>
      <div className="list-body">
        <h5 className="list-title">Marks and Spencer</h5>
        <p className="list-text">
        Women Cateye Sunglasses
        </p>
      </div>
      {/* <ul className="list-group list-group-flush">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Vestibulum at eros</li>
      </ul> */}
      <div className="card-body">
        {/* <a href="#" className="list-link">Card Link</a> */}
        <a href="#" className="list-link">View Product</a>
      </div>
    </div>
    </div>
  );
}

export default Lists;
