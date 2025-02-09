import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logoutpg = () => {
    
    const navigate = useNavigate();

    const logoutApi = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/logout', {
                method: 'GET', credentials: 'include',
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data);
                alert('user has been logged out.');
                localStorage.clear();
                navigate('/');
            }
        } catch (err) {
            console.log('error: ', err);
        }
    }

    useEffect(() => {
        logoutApi();
    }, []);

    return (
        <></>
    )
}

export default Logoutpg
