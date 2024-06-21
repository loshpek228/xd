import { useSelector, useDispatch } from "react-redux";
import './Cart.css'
import { addCart, deleteCart, decrementCart } from "../../redux/reducer";
import { useEffect, useState } from "react";

const Cart = () => {
    const cartList = useSelector(state => state.reducer.cart);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
   
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cart = JSON.parse(storedCart);
          
            cart.forEach(item => {
                dispatch(addCart(item));
            });
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
      
        localStorage.setItem('cart', JSON.stringify(cartList));
    }, [cartList]);

    if (loading) {
        return <div className="container cart"><p>Loading...</p></div>;
    }

    return (
        <div className="container cart">
            <p>Total: <b>${cartList.reduce((acc, item) => {
                return acc + (item.price * item.count)
            }, 0).toFixed(2)}</b></p>
            {
                cartList.map(item => (
                    <div className="cart-item" key={item.id}>
                        <div className="cart-item-left">
                            <img src={item.image} alt="" />
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                        <div className="cart-item-right">
                            <div className="cart-count">
                                <button onClick={() => {
                                    dispatch(addCart(item));
                                }} className="cart-count-btn">+</button>
                                <span>{item.count}</span>
                                <button onClick={() => {
                                    dispatch(decrementCart(item))
                                }} className="cart-count-btn">-</button>
                            </div>
                            <p className="cart-item-price">${(item.price * item.count).toFixed(2)}</p>
                            <button onClick={() => {
                                dispatch(deleteCart(item))
                            }} className="cart-delete-btn">delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Cart;
