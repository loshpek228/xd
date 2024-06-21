import './Detail.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/reducer';
import Preloader from './Preloader';

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 

            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [id]);

    const handleBuy = () => {
        dispatch(addCart(product));
        navigate(-1);
    };

    return (
        <div className='container-detail'>
            {loading ? (
                <Preloader /> 
            ) : (
                <div className="row">
                    <div className="col-6">
                        <img src={product.image} alt="" className="detail-img" />
                    </div>
                    <div className="col-6">
                        <h2 className="detail-title">{product.title}</h2>
                        <p className="detail-text">{product.description}</p>
                        <br />
                        <p className="detail-text"> category: <b>{product.category}</b></p>
                        <p className="detail-text"> rating: <b>{product.rating?.rate}</b></p>
                        <p className="detail-text"> price: <b>${product.price}</b></p>
                        <br />
                        <button onClick={handleBuy} className="detail-btn">buy</button>
                        <button onClick={() => navigate(-1)} className="detail-btn">go back</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
