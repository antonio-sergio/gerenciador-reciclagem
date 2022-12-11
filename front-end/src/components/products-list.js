import ProducDataService from '../services/product.service';
import React, { Suspense, useEffect, useState } from "react";
import "react-toastify/ReactToastify.min.css";
import { Link } from 'react-router-dom';
function AddProduct() {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName)
    }

    useEffect(() => {
        const retrieveProducts = () => {
            ProducDataService.getAll()
                .then(response => {
                    setProducts(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
        retrieveProducts()
    }, [])
    


    const refreshList = () => {
        // retrieveProducts();
        setCurrentIndex(-1);
        setCurrentProduct(null)
    }

    const setActiveProduct = (product, index) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
    }

    const removeAllProducts = () => {
        ProducDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const searchByName = () => {
        setCurrentIndex(-1);
        setCurrentProduct(null);

        ProducDataService.findByName(searchName)
            .then(response => {
                setProducts(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    // const onChangeName = (e) => {
    //     let name = e.target.value
    //     setName(name);
    // }

    // const onChangePrice = (e) => {
    //     let price = e.target.value;
    //     setPrice(price);
    // }

    // const saveProduct = () => {
    //     var data = {
    //         name: name,
    //         price: price
    //     };
    //     ProducDataService.create(data)
    //         .then(response => {
    //             console.log(response);
    //             // setId(response.data.id);
    //             setName(response.data.name);
    //             setPrice(response.data.price);
    //             setSubmitted(true);
    //             addNotification();
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    // const newProduct = () => {
    //     // setId(null);
    //     setName("");
    //     setPrice("");
    //     setSubmitted(false)
    // }



    return (
        <Suspense fallback="Loading...">
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={searchByName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Products List</h4>

                    <ul className="list-group">
                        {products && products.map((product, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveProduct(product, index)}
                                key={index}
                            >
                                {product.name}
                            </li>
                        ))}

                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={removeAllProducts}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentProduct ? (
                        <div>
                            <h4>Product</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentProduct.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Id:</strong>
                                </label>{" "}
                                {currentProduct.id}
                            </div>
                             
                            
                                <Link to={`/products/${currentProduct.id}`} >Edit</Link>
                            
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Product...</p>
                        </div>
                    )}
                </div>
            </div>

        </Suspense>

    )
}

export default AddProduct;