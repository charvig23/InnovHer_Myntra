import React, { useState } from 'react';

const StyledForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [numProducts, setNumProducts] = useState(0);
  const [products, setProducts] = useState([{ name: '', link: '' }]);

  const handleNumProductsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumProducts(value);

    const newProducts = Array.from({ length: value }, (_, index) => (
      products[index] || { name: '', link: '' }
    ));
    setProducts(newProducts);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      image,
      products,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Styled Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </label>
      </div>
      <div>
        <label>
          Number of Products Used:
          <input type="number" value={numProducts} onChange={handleNumProductsChange} min="0" required />
        </label>
      </div>
      {products.map((product, index) => (
        <div key={index}>
          <label>
            Product {index + 1} Name:
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              required
            />
          </label>
          <label>
            Product {index + 1} Link:
            <input
              type="url"
              value={product.link}
              onChange={(e) => handleProductChange(index, 'link', e.target.value)}
              required
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default StyledForm;
