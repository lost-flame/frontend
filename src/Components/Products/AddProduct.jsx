import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '', description: '', price: '', stock: '', brand: '', ratings: ''
    });
    const navigate = useNavigate();
    const [selectValue, setSelectValue] = useState('');
    const [categoryapi, setCategoryapi] = useState([]);
    const [img, setImg] = useState('');

    const handleProduct = (e) => {
        const { value, name, files } = e.target;
        console.log(e.target.value);
        console.log(e.target.files);

        if (files && files.length > 0) {
            console.log('productimg has been selected.');
            setImg(files[0]);
        }

        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleProductSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(productData);

            const newdata = new FormData();
            newdata.append('productimg', img);

            // Append productData fields individually
            Object.keys(productData).forEach(key => {
                newdata.append(key, productData[key]);
            });

            newdata.append('categoryName', selectValue);

            let response = await fetch('http://localhost:5000/product/addProduct', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: newdata
            });

            let data = await response.json();

            if (response.status === 201) {
                console.log(data);
                alert(data.message);
                navigate('/product');
            }
            else if (response.status === 400) {
                console.log(data);
                alert(data.message);
            }
            else {// 500 status
                console.log(data);
                alert(data);
            }
        }
        catch (err) {
            console.log('product submit error', err);
        }
    }

    const handleSelect = (e) => {
        console.log(e.target.value);
        setSelectValue(e.target.value);
    }

    const categoryApi = async () => {
        let response = await fetch('http://localhost:5000/product/getAllCategories', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        });

        let data = await response.json();
        if (response.status === 200) {
            console.log(data.message);
            setCategoryapi(data.message);
        }
        else {
            console.log('category not fetched');
            navigate('/');
        }
    }

    useEffect(() => {
        categoryApi();
    }, []);

    return (
        <section>
            <div className='row container-fluid w-100 m-0 p-0'>
                <div className='col-12 w-100 bg-black p-0'>
                    <div className='w-100 p-0 m-0 bg-danger'>
                        <center>
                            <div className='fs-2'>
                                Products
                            </div>
                            <div className='w-50 p-2 m-0 bg-success'>
                                <form method='POST' className='m-0 p-0 bg-body-tertiary' onSubmit={handleProductSubmit}>
                                    <div>
                                        <figure>
                                            <input type='file' name='productimg' id='productimg' onChange={handleProduct}></input>
                                        </figure>
                                    </div>
                                    {
                                        ['name', 'description', 'price', 'stock', 'brand', 'ratings'].map((e, i) => {
                                            return (
                                                <div key={i} className='w-75 d-flex p-3 m-1 fs-4'>
                                                    <div className='w-50 text-center text-capitalize'>
                                                        <label htmlFor={e}>{e}</label>
                                                    </div>
                                                    <input className='w-100 rounded-3' type='text' placeholder={` Enter the product ${e}`} name={e} id={e} value={productData[e]} onChange={handleProduct}></input>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='w-75 p-3 m-1 fs-4'>
                                        <select className='w-50 fs-4 text-center text-capitalize' value={selectValue} onChange={handleSelect}>
                                            <option value='' disabled>Select the Category</option>
                                            {
                                                categoryapi.length !== 0 &&
                                                (categoryapi.map((e, i) => {
                                                    return (
                                                        <option key={i} value={e.name}>{e.name}</option>
                                                    )
                                                })
                                                )
                                            }
                                        </select>
                                    </div>
                                    <button type='submit' className='btn btn-danger fs-4 w-25'>Add</button>
                                </form>
                            </div>
                        </center>
                    </div>
                </div>
                {/* <div className='col-4 w-100 p-0 m-0 bg-body-secondary'>
            <div className='w-100 p-0 m-0 bg-danger'>
                    <center>
                    <div className='fs-2'> 
                        Category 
                    </div>
                    <div className='w-50 p-3 m-0 bg-success'>
                        <form method='POST' className='m-0 p-0 bg-body-tertiary' onSubmit={handleProductSubmit}>
                        <div className='w-75 p-3 m-1 fs-4'>
                        <select className='w-75 fs-4 text-center text-capitalize' value={selectValue} onChange={handleSelect}>
                        <option value='Select the Category'>Select the Category</option>
                        {
                            ['name', 'email', 'age', 'city'].map((e,i)=>{
                                return(
                                    <option key={i} value={e}>{e}</option>
                                )
                            })
                        }
                        </select>
                        </div>
                        <button type='submit' className='btn btn-danger fs-4 w-25'>Add</button>
                        </form>
                    </div>
                        </center>
                </div>
                
            </div> */}
            </div>
        </section>
    )
}

export default AddProduct
