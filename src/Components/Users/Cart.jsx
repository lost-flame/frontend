import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const [cartData, setCartData] = useState([]);

    const cartApi = async () => {
        try {
            const response = await fetch(`https://backend-jwcc.onrender.com/product/getAllCartProducts`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include'
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data.message);
                setCartData(data.message);
            }
            else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleQuantity = async (curId, newQuantity) => {
        console.log(curId, newQuantity);
        setCartData((prev) => {
            return prev.map((e) => e.id === curId ? { ...e, quantity: newQuantity } : e)
        });

        try {
            const response = await fetch(`https://backend-jwcc.onrender.com/product/updateQuantity/${curId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ quantity: newQuantity })
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            console.log('cart id: ', id);
            const response = await fetch(`https://backend-jwcc.onrender.com/product/deleteUserCart/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include'
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data.message);
                alert(data.message);
                setCartData((prev) => {
                    return prev.filter((e => e.id !== id))
                })
            }
            else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        cartApi();
    }, []);

    return (
        <section>
            <div className='row container-fluid w-100 m-0 p-0'>
                {
                    cartData.length > 0 &&
                    (
                        cartData.map((e, i) => {
                            return (
                                <div key={i} className='w-100 d-flex justify-content-evenly'>
                                    <div>
                                        {e.productName}
                                    </div>
                                    <div>
                                        <button className='btn btn-danger' onClick={() => { handleQuantity(e.id, Math.max(e.quantity - 1, 1)) }}>{'-'}</button>
                                        <input type='text' disabled value={e.quantity} ></input>
                                        <button className='btn btn-success' onClick={() => handleQuantity(e.id, Math.min(e.quantity + 1, 10))}>{'+'}</button>
                                    </div>
                                    <div>{e.price}</div>
                                    <div>
                                        <button onClick={() => { handleDelete(e.id) }}>Delete</button>
                                    </div>
                                    <div>
                                        <NavLink to='/orderplace' state={e}>Order Place</NavLink>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </section>
    )
}

export default Cart
