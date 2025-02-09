import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const DisplayProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [productData, setProductData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const paginationApi = async () => {
        try {
            const response = await fetch('http://localhost:5000/product/pagination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ curPage: currentPage, itemPage: itemsPerPage }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(data);
                setProductData(data.message);
                setTotalPages(data.pageCount);
            }
            else {
                console.log(data);
                alert(data.message);
            }
        } catch (err) {
            console.log(data.message);
            navigate('/');
        }
    }

    useEffect(() => {
        paginationApi();
    }, [itemsPerPage, currentPage]);

    return (
        <section>
            <div className='row container-fluid w-100 m-0 p-0'>
                <div className='col-12 w-100 bg-black p-0'>
                    <div className='w-100 p-0 m-0 bg-danger'>
                        <center>
                            <div className='fs-2'>
                                Products
                            </div>
                            <div className='w-100 bg-body d-flex flex-wrap justify-content-evenly p-3'>
                                {
                                    productData.length !== 0 &&
                                    (
                                        productData.map((e, i) => {
                                            return (
                                                <div key={i} className="card w-25 m-2">
                                                    <div>
                                                        <figure>
                                                            <img src={`http://localhost:5000/uploads/${e.productimg}`} className="card-img-top" alt="productimg" />
                                                        </figure>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title w-100 fw-bold fs-5">{e.name}</h5>
                                                        <p className="card-text d-inline-block w-25 fw-bold">Price: Rs.{e.price}</p>
                                                        <p className="card-text d-inline-block w-25 fw-bold">In Stock: {e.stock}</p>
                                                        <p className="card-text d-inline-block w-25 fw-bold">Ratings: {e.ratings}</p>
                                                        <NavLink to='/productdetails' state={e.id} className="btn btn-primary w-50">Details</NavLink>
                                                    </div>  
                                                </div>
                                            )
                                        })
                                    )
                                }
                            </div>
                            <div className='w-100 bg-gradient'>
                                {/* previous page */}
                                <button className={`btn btn-info ${currentPage === 1 ? 'disable' : ''}`} onClick={() => { setCurrentPage(Math.max(currentPage - 1, 1)); console.log(currentPage) }}>{'<<'}</button>
                                {/* pagination */}
                                {
                                    Array.from({ length: totalPages }).map((e, i) => {
                                        return (
                                            <button key={i} className={`btn btn-warning  ${currentPage === 1 ? 'active' : ''}`} onClick={() => { setCurrentPage(i + 1); console.log(currentPage) }}>{i + 1}</button>
                                        )
                                    })
                                }
                                {/* next page */}
                                <button className={`btn btn-info ${currentPage === totalPages ? 'disable' : ''}`} onClick={() => { setCurrentPage(Math.min(currentPage + 1, totalPages)); console.log(currentPage) }}>{'>>'}</button>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DisplayProduct