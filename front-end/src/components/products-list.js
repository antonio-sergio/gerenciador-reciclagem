import ProducDataService from '../services/product.service';
import React, { Suspense, useEffect, useState } from "react";
import "react-toastify/ReactToastify.min.css";
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ProductDataService from "../services/product.service";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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



function AddProduct() {

    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const refreshPage = () => {
        window.location.reload(false);
      }

    const handleClose = (e) => {
        const aux = e.target.value;
        if (aux === 'agree') {
            ProductDataService.update(
                product.id,
                product
            )
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        } else {
            refreshPage();
            console.log('');
            
        }
        refreshList();
        setOpen(false);
    };

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


    const retrieveProducts = () => {
        ProducDataService.getAll()
            .then(response => {
                setProducts(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    const refreshList = () => {
        retrieveProducts();
        setCurrentIndex(-1);
        setCurrentProduct(null);
        console.log('atualizado');
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
        console.log('');
    }

    const edit = async (params) => {
        handleClickOpen();

        const product = {
            id: params.id,
            name: params.name,
            price: params.price
        }
        setProduct(product);

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
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Você deseja alterar os dados?"}
                            </DialogTitle>
                            {/* <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Você deseja alterar os dados?
                                </DialogContentText>
                            </DialogContent> */}
                            <DialogActions>
                                <Button onClick={e => handleClose(e)} value='disagree'>Descartar</Button>
                                <Button onClick={e => handleClose(e)} value='agree' autoFocus>
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                                onProcessRowUpdateError={onProcessRowUpdateError}
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