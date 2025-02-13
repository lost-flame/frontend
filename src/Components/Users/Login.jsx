import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData,setFormData] = useState({
        email:'',password:''
    });
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {value,name}=e.target;
        console.log(value,name);

        setFormData((prev)=>{
            return(
                {...prev,[name]:value}
            )
        });

    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('https://backend-jwcc.onrender.com/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data);
                alert(data.message);
                localStorage.setItem('user','true');
                navigate('/product');
            }
            else {
                console.log(data);
                alert(data.message);
            }
        } catch (err) {
            console.log(data.message);
        }
    }
    return (
        <section>
            <div className='row container-fluid m-0 p-0'>
                <form method='POST' onSubmit={handleSubmit}>
                {
                    ['email', 'password'].map((e, i) => {
                        return(
                            <div key={i} className='col-6'>
                                <div>
                                    <label htmlFor='e' className='text-capitalize'>{e}</label>
                                </div>
                                <input type={`${e === 'email' ? 'text' : 'password'}`} placeholder={` Enter your ${e}`} name={e} id={e} value={formData[e]} onChange={handleChange}></input>
                            </div>
                        )
                    })
                }
                <button type='submit'>Login</button>
                </form>
            </div>
        </section>
    )
}

export default Login
