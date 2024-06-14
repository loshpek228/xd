import { useState,useEffect } from "react";
import axios from "axios"
import './CategoryComponent.css'

    const CategoryComponent = ({category, limit}) =>{
        const [productList,setProductList] = useState([]);

useEffect(()=>{
    setProductList([])
    axios(
        limit
        ? `https://fakestoreapi.com/products/category/${category}?limit=${limit}`
        : `https://fakestoreapi.com/products/category/${category}`
    )
    .then(({data})=>{
        setProductList(data)
    })
},[category])

        return(
            <div>
              <h1>{category}</h1>
              <div className="row">
        {productList.map((item) => {
          return (
            <div key={item.id} className="col-4">
              <div className="product-card">

                <img src={item.image} alt="" className="product-card-img" />
                <h4 className="product-card-title">{item.title.length > 20
                   ? item.title.substr(0,27).trim() + '...' 
                   : item.title 
                 } </h4>
                <p className="product-card-text">{item.description.length > 40
                  ? item.description.substr (0,37).trim()  +  '...' 
                  : item.description }</p>
                
                <div className="product-card-bottom">
                  <p className="product-card-price">${item.price}</p>
                  <button className="product-card-btn">buy</button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

            </div>
        )
    }

    export default CategoryComponent;