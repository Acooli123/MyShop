import React from 'react'
import myShop from '../assets/MyShop.jpg'

export default function Home() {
  return (
    <div style={{marginTop : 30}}>
      <h1>Welcome to Our Online Store</h1>
        <p>Explore our wide range of products and enjoy shopping from the comfort of your home.</p>
        <p>Browse through our categories, add items to your cart, and proceed to checkout with ease.</p>
        <p>Happy Shopping!</p>
        <img src={myShop} alt="Welcome Banner" style={{width: '100%', height: 'auto', marginTop: '20px'}} />
    </div>
  )
}
