import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseLink = "http://localhost:5000/api/products";

const ProductList = () => {
  const [prods, setProds] = useState([]);
  //implement the get products function
   const fetchProducts = async () => {
    const response = await axios.get(baseLink);
    setProds(response.data);
  };

  //implement the delete function
  const handleDelete = (id) => {
    axios({
      method: 'delete',
      url: baseLink+'/'+id,
      responseType: 'stream'
    })
      .then(function (response) {
        setProds(prods.filter(prod => prod.id !== id));
        return response.data;
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div style={{width: '100%', height:'100%', overflow: 'scroll', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1>Simple Card List</h1>
      <div className='product-list'>
        {prods.map((v, i)=>{
          return (
            <div key={i} className='product-item'>
              <div className='delete-button'><img src="./garbage.png" alt="PICTURE NOT FOUND" onClick={
                ()=>{
                  handleDelete(v.id);
                }
              }></img></div>
              <div className='product-image'><img src={v.imageUrl} style={{width: '100%'}} alt="PICTURE NOT FOUND"></img></div>
              <div className='product-name'>{v.name}</div>
              <div className='product-price'>
                ${v.price}
              </div>
              <div className='product-description'>
                {v.description}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProductList;