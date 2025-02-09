import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const OrderPlacepg = () => {
  const [formData, setFormData] = useState({
    name: '', ['account number']: '', cvv: '', ['expiry date']:''
  });
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

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
      const response = await fetch('http://localhost:5000/product/orderPlace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          formData, cart_id: location.state.id,
          user_id: location.state.user_id, p_id: location.state.p_id,
          quantity: location.state.quantity, price: location.state.price
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        alert(data.message);
        navigate('/product');
      }
      else if(response.status === 400){// 400 status
        console.log(data.message);
        alert(data.message);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <section>
      <div className='row container-fluid m-0 p-0'>
        <form method='POST' onSubmit={handleSubmit}>
          {
            ['name', 'account number', 'cvv', 'expiry date'].map((e, i) => {
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
          <button type='submit'>Order Place</button>
          <NavLink to='/product'>Order Cancel</NavLink>
        </form>
      </div>
    </section>
  )
}

export default OrderPlacepg
