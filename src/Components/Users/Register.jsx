import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '', password: '', about: '', age: '', contact: '', name: ''
    });
    const navigate = useNavigate();

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
            const response = await fetch('http://localhost:5000/user/createData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.status === 201) {
                console.log(data);
                alert(data.message);
                navigate('/login');
            }
            else {
                console.log(data);
                alert(data.message);
            }
        } catch (err) {
            console.log('error: ', data.message);
        }
    }
    
    return (
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
                    <button type='submit'>Register</button>
                </form>
            </div>
        </section>
    )
}

export default Register
