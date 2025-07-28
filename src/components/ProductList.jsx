// ProductList.jsx
import React, { useState } from 'react';
import Product from './Product';
import phoneImage from '../assets/Apple-iPhone-16-Pro-Max.jpg';
import macbookImage from '../assets/Apple_new-macbook.jpg';
import iphone from '../assets/iPhone 15.jpg';
import hp from '../assets/hp pavilion.jpg';
import shirt from '../assets/shirt.jpg';
import kurta from '../assets/kurta.jpg';
import blesure from '../assets/blesure.jpg';

const productList = [
  {
    name: 'Apple iPhone 16 Pro Max',
    price: '80000',
    image: phoneImage,
    description: 'Latest Apple iPhone with advanced features.',
  },
  {
    name: 'Apple MacBook Pro',
    price: '120000',
    image: macbookImage,
    description: 'Latest Apple MacBook with powerful performance.',
  },
  {
    name: 'Apple iPhone 15 Pro',
    price: '65000',
    image: iphone,
    description: 'Latest Apple iPhone with advanced features.',
  },
  {
    name: 'HP Pavilion Laptop',
    price: '90000',
    image: hp,
    description: 'Reliable HP Pavilion Laptop with strong specs.',
  },
  {
    name : 'comfotable t-shirt for men',
    price : '1500',
    image : shirt,
    description : 'very affortable and trending t-shirts collection are available here. Go and check our store collections.'
  },
  {
    name : 'comfotable kurta for men',
    price : '1200',
    image : kurta,
    description : 'very affortable and trending ethnic collection are available here. Go and check our store collections.'
  },
  {
    name : 'comfotable blesure for men',
    price : '10000',
    image : blesure,
    description : 'very affortable and trending western collection are available here. Go and check our store collections.'
  }
];

const ProductList = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleCartChange = (isAdded) => {
    setCartCount((prev) => prev + (isAdded ? 1 : -1));
  };

  return (
    <div className="container">
      <h3 className="text-center my-5">
        🛒 Items in Cart: <span className="badge bg-success">{cartCount}</span>
      </h3>
      <div className="d-flex flex-wrap justify-content-center gap-4 p-4">
        {productList.map((prod, index) => (
          <Product
            key={index}
            name={prod.name}
            price={prod.price}
            image={prod.image}
            description={prod.description}
            onCartChange={handleCartChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
