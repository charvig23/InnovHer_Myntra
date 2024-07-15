import React, { useState, useEffect } from 'react';
import '../App.css';
import Lists from './Lists';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

function ListingsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/entry/${id}/products`);
        const data = response.data; 
        if (data.success) {
          setProducts(data.data);
          setLoading(false);
        } else {
          setError(data.message || 'Error fetching products');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Server error');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  console.log("products", products);

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

  return (
    <div className='product-list-container'>
      {products.map((product, index) => (
        <Lists
          key={index}
          imageUrl={product.imageUrl}
          productName={product.productName}
          productDesc = {product.productDesc}
          productPrice={product.productPrice}
          productLink={product.productLink}
        />
      ))}
    </div>
  );
}

export default ListingsPage;

