import { useSelector } from 'react-redux';
import './Header.css'
import { Link } from 'react-router-dom';
import { store } from '../../redux';
import React from 'react';





const Header = ({count,addItemToCart}) =>{
    const itemCount = useSelector(state => state.reducer.itemCount);
    const categories = useSelector((store)=>{
        return store.reducer.categories;
    });
    return(
       
           <header className='header'>
            <div className='container header-container'>
            <span className="item-count">{itemCount}</span> {}

                <h1 className='header-logo'>
                    <Link to={'/'}>Shop</Link>
                </h1>
                <nav className='header-nav'>



                    {
                        categories.map(item=>{
                            return <Link key={item} to={`/category/${item}`}>{item}</Link>
                        })
                    }


                 <Link to={'/'}>home</Link>
                 <Link to={'/cart'}>cart</Link>-
                </nav>
                🔥 {itemCount}
            </div>

           </header>
        
    )
}
export default Header;