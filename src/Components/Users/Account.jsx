import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [userData, setUserData] = useState({});
    const [formData, setFormData] = useState({
        email: '', password: '', about: '', age: '', contact: '', name: ''
    });
    const navigate = useNavigate();

    const userDataApi = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/getUser', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }, credentials: 'include'
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data);
                setUserData(data.message);
                setFormData({
                    email: data.message.email || '',
                    password: '', name: data.message.name || '',
                    contact: data.message.contact || '',
                    age: data.message.age || '', about: data.message.about || ''
                });
            }
            else {
                console.log(data);
                alert(data.message);
                navigate('/login');
            }
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        console.log(value, name);

        setFormData((prev) => {
            return (
                { ...prev, [name]: value }
            )
        });

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch(`http://localhost:5000/user/updateUser/${userData.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data);
                alert(data.message);
            }
            else {
                console.log(data);
                alert(data.message);
            }
        } catch (err) {
            console.log('error: ', err);
            alert('please try again');
        }
    }

    useEffect(() => {
        userDataApi();
    }, []);

    return (
        userData &&
        (
            <section>
                <div className='row container-fluid m-0 p-0'>
                    <form method='POST' onSubmit={handleSubmit}>
                        {
                            ['name', 'email', 'password', 'contact', 'age', 'about'].map((e, i) => {
                                return (
                                    <div key={i} className='col-6'>
                                        <div>
                                            <label htmlFor='e' className='text-capitalize'>{e}</label>
                                        </div>
                                        <input type={`${e === 'password' ? 'password' : 'text'}`} placeholder={` Enter your ${e === 'about' ? 'details' : e}`} name={e} id={e} value={formData[e]} onChange={handleChange}></input>
                                    </div>
                                )
                            })
                        }
                        <button type='submit'>Update</button>
                    </form>
                </div>
            </section>
        )
    )
}

export default Account
