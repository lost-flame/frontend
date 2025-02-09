import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [flag, setFlag] = useState(false);
    const [cartId, setCartId] = useState(0);

    const cartApi = async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/getUserCartId`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include'
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data.message);
                setCartId(data.message);
            }
        } catch (err) {
            console.log('user is not logged in yet.', err);
        }
    }

    // useEffect(() => {
    //     flag && cartApi();
    // }, [flag]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setFlag(user === 'true');
    }, []);

    return (
        <section>{console.log(flag)}
            <div className='row container-fluid m-0 p-0'>
                <div className='col-12 fs-1 d-flex justify-content-evenly'>
                    <div>
                        <NavLink to='/'>Home</NavLink>
                    </div>
                    <div>
                        <NavLink to='/product'>Product</NavLink>
                    </div>
                    {
                        !flag ?
                            (
                                <>
                                    <div>
                                        <NavLink to='/register'>Register</NavLink>
                                    </div>
                                    <div>
                                        <NavLink to='/login'>Login</NavLink>
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <div>
                                        <NavLink to='/cart'>Cart</NavLink>
                                    </div>
                                    <div>
                                        <NavLink to='/account'>Account</NavLink>
                                    </div>
                                    <div>
                                        <NavLink to='/logout'>Logout</NavLink>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </section>
    )
}

export default Navbar
