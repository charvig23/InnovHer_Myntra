import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const StyledForm = () => {
  const [name, setName] = useState('');
  const [numProducts, setNumProducts] = useState(1);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [productsLinks, setProductsLinks] = useState([{ link: '' }]);


  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNumProductsChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (value <= 0) {
      setNumProducts(1);
      setProductsLinks([{ link: '' }]);
    } else {
      setNumProducts(value);
      const newProductsLinks = Array.from({ length: value }, (_, index) => (
        productsLinks[index] || { link: '' }
      ));
      setProductsLinks(newProductsLinks);
    }
  };

  const handleProductLinkChange = (index, value) => {
    const newProductsLinks = [...productsLinks];
    newProductsLinks[index].link = value;
    setProductsLinks(newProductsLinks);
  };

  const handleUploadImageChange = (e) => {
    const files = Array.from(e.target.files);
    const uploadedImagesData = files.map(file => ({
      data: file,
      contentType: file.type
    }));
    setUploadedImages(uploadedImagesData);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append form data including files
    formData.append('name', name);
    formData.append('num_of_products_used', numProducts);
    uploadedImages.forEach((image, index) => {
      formData.append(`uploaded_images`, image.data, `image-${index}.${image.contentType.split('/')[1]}`);
    });
    productsLinks.forEach((product, index) => {
      formData.append(`products_links[${index}]`, product.link);
    });

    try {
        const response = await axios.post("http://localhost:3000/submit/entry", formData, {
            withCredentials: true,
            headers: {
                'content-Type': 'multipart/form-data', 
            }
        });
        console.log(response.data);
        if (response.data.success === true) { 
            toast.success("Entry submitted successfully");
            navigate('/voting'); 
        } else {
            toast.error("Entry could not be submitted" + response.data.msg);
        }
    } catch (error) {
        setError(error.response.data.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div><img src="/banner.png" alt="Banner" /></div>
        <div className='form-container'>
          <div>
            <label>
              Name:
              <br/>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          </div>
          <div>
            <label>
              Upload Images:
              <br/>
              <input type="file" onChange={handleUploadImageChange} multiple required />
            </label>
          </div>
          <div>
            <label>
              Number of Products Used:
              <br/>
              <input type="number" value={numProducts} onChange={handleNumProductsChange} min="0" required />
            </label>
          </div>
          {productsLinks.map((product, index) => (
            <div key={index}>
              <label>
                Product {index + 1} Link: 
                <br/>
                <input
                  type="url"
                  value={product.link}
                  onChange={(e) => handleProductLinkChange(index, e.target.value)}
                  required
                />
              </label>
            </div>
          ))}
          <button className='red-button' type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default StyledForm;