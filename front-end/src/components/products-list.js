import ProducDataService from '../services/product.service';
import React, { Suspense, useEffect, useState } from "react";
import "react-toastify/ReactToastify.min.css";
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ProductDataService from "../services/product.service";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Nome",
        width: 150,
        editable: true
    },
    {
        field: "price",
        headerName: "Preço",
        width: 150,
        editable: true
    },
    { field: "edit", headerName: "Editar", width: 90 },


];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 15 },
    { id: 6, lastName: "Melisandre", firstName: "null", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];




function AddProduct() {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [agree, setAgree] = useState(false);

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName)
    }

    useEffect(() => {
        const retrieveProducts = () => {
            ProducDataService.getAll()
                .then(response => {
                    setProducts(response.data);
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

    const onProcessRowUpdateError = () => {
        console.log('erro');
    }

    const edit = (params) => {
        const product = {
            name: params.name,
            price: params.price
        }
        console.log('produ', product);
        ProductDataService.update(
            params.id,
            product
          )
            .then(response => {
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        console.log('editado');
        };
    return (
        <>
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
                        <Box sx={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rows={products}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                                onRowClick={(row) => {
                                    console.log('row', row.row);
                                    setActiveProduct(row.row, row.id)
                                }}
                                processRowUpdate={(row) => {
                                    console.log('row dentro do compo', row);
                                    edit(row)
                                }}
                                onProcessRowUpdateError = {onProcessRowUpdateError}
                            />
                        </Box>
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

        </>

    )
}

export default AddProduct;