import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const DisplayProductsDetails = () => {
    const [productData, setProductData] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const productApi = async () => {
        try {
            const response = await fetch(`https://backend-jwcc.onrender.com/product/getProduct/${location.state}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                credentials: 'include'
            });
            console.log('rerendering api.', response);
            const data = await response.json();

            if (response.status === 200) {
                console.log(data);
                setProductData(data.message);
            }
            else {
                console.log(data);
                alert(data);
            }
        } catch (err) {
            console.log(err);
            navigate('/');
        }
    }

    useEffect(() => {
        productApi();
    }, []);

    const handleCart = async () => {
        try {
            const response = await fetch(`https://backend-jwcc.onrender.com/product/addCartProduct`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    productName: productData.name, stock: productData.stock
                    , price: productData.price, quantity
                    , p_id: productData.id
                }),
                credentials: 'include'
            });
            console.log('rerendering api.', response);
            const data = await response.json();

            if (response.status === 200) {
                console.log(data.message);
                alert(data.message);
                setFlag(true);
            }
            else {
                console.log(data);
                alert(data.message);
            }
            setQuantity(0);
            setFlag(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section>{console.log(productData)}
            <div className='row container-fluid w-100 m-0 p-0'>
                <div className='col-12 w-100 bg-black p-0'>
                    <div className='w-100 p-0 m-0 bg-danger'>
                        <center>
                            <div className='fs-2'>
                                Products Details
                            </div>
                            <div className='w-75 p-2 m-0 bg-body'>
                                <img className='w-100' src={`https://backend-jwcc.onrender.com/uploads/${productData.productimg}`} alt='img' />
                                {
                                    productData.length !== 0 &&
                                    (
                                        <div className='fs-4 d-flex flex-column justify-content-evenly w-75 bg-danger-subtle '>
                                            <div className='w-100 d-flex justify-content-evenly'>
                                                <div className='w-50'>Name:</div>
                                                <div className='w-50 text-start'>{productData.name}</div>
                                            </div>
                                            <div className='w-100 d-flex justify-content-evenly'>
                                                <div className='w-50'>In Stock:</div>
                                                <div className='w-50 text-start'>{productData.stock}</div>
                                            </div>
                                            <div className='w-100 d-flex justify-content-evenly'>
                                                <div className='w-50'>Price:</div>
                                                <div className='w-50 text-start'>{productData.price}</div>
                                            </div>
                                            <div className='w-100 d-flex justify-content-evenly'>
                                                <div className='w-50'>Ratings:</div>
                                                <div className='w-50 text-start'>{productData.ratings}</div>
                                            </div>
                                            <div className='w-100 d-flex justify-content-evenly'>
                                                <div className='w-50'>Descriptions:</div>
                                                <div className='w-50 text-start'>{productData.description}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                <span>
                                    <button className='btn btn-danger' onClick={() => setQuantity(Math.max(quantity - 1, 1))}>{'-'}</button>
                                    <input type='text' disabled value={quantity}></input>
                                    <button className='btn btn-success' onClick={() => setQuantity(Math.min(quantity + 1, 10))}>{'+'}</button>
                                </span>
                                <button className='btn btn-warning' onClick={handleCart}>Add Cart</button>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DisplayProductsDetails
