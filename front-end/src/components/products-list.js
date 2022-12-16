import ProducDataService from '../services/product.service';
import React, { Suspense, useEffect, useState } from "react";
import "react-toastify/ReactToastify.min.css";
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import ProductDataService from "../services/product.service";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const localizedTextsMap = {
    columnMenuUnsort: "Não classificado",
    columnMenuSortAsc: "Classificar por ordem crescente",
    columnMenuSortDesc: "Classificar por ordem decrescente",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuShowColumns: "Mostrar colunas"
};

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


];


function AddProduct() {

    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [ setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [product, setProduct] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
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
    const handleCloseDelete = (e) => {
        const aux = e.target.value;
        if (aux === 'agree') {
            ProducDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
        } else {
            refreshPage();
            console.log('');
            
        }
        refreshList();
        setOpenDelete(false);
    };

    const onChangeSearchName = (e) => {
        console.log('name no onchange', e.target.value);
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
        handleClickOpenDelete()
        
    }

    const searchByName = () => {
        console.log('search name chamado');
        setCurrentIndex(-1);
        setCurrentProduct(null);

        ProducDataService.findByName(searchName)
            .then(response => {
                console.log('search name no service', searchName);
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
                <div className="list row mx-3">
                    <div className="col-md-8">
                        <div className="input-group mb-3 mt-2 w-50">
                            <input
                                id='searchName'
                                type="text"
                                className="form-control"
                                placeholder="Pesquise pelo nome"
                                value={searchName}
                                onChange={(e) => onChangeSearchName(e)}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={searchByName}
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Lista de Produtos</h4>
                        <div>
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
                            <Dialog
                                open={openDelete}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Você deseja excluir todos os dados?"}
                                </DialogTitle>
                                {/* <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Você deseja alterar os dados?
                                    </DialogContentText>
                                </DialogContent> */}
                                <DialogActions>
                                    <Button onClick={e => handleCloseDelete(e)} value='disagree'>Cancelar</Button>
                                    <Button onClick={e => handleCloseDelete(e)} value='agree' autoFocus>
                                        Confirmar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div className=''>
                            <Box sx={{ height: 500, width: "100%", marginTop: 3 }}>
                                <DataGrid
                                    localeText={localizedTextsMap}
                                    rows={products}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    // checkboxSelection
                                    // disableSelectionOnClick
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
                        </div>
                        

                        <button
                            className="m-3 btn btn-sm btn-danger"
                            onClick={removeAllProducts}
                        >
                            Apagar todos
                        </button>
                    </div>
                    <div className="col-md-6">



                        {currentProduct ? (
                            
                            <div>
                                {/* <h4>Produto</h4>
                                <div>
                                    <label>
                                        <strong>Nome:</strong>
                                    </label>{" "}
                                    {currentProduct.name}
                                    
                                </div>
                                <div>
                                    <label>
                                        <strong>Id:</strong>
                                    </label>{" "}
                                    {currentProduct.id}
                                </div>
                                <div>
                                    <label>
                                        <strong>Id:</strong>
                                    </label>{" "}
                                    {currentProduct.id}
                                    
                                </div> */}
                                <div className='mt-5'>
                                <Card sx={{ maxWidth: 250 }}>
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      height="200"
                                      image={currentProduct.image}
                                      alt={currentProduct.name}
                                    />
                                    <CardContent>
                                      <Typography gutterBottom variant="h5" component="div">
                                      {currentProduct.name}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        R$ {currentProduct.price}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                                </div>


                                <Link to={`/products/${currentProduct.id}`} >Editar</Link>


                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Por favor selecione um produto...</p>
                            </div>
                        )}
                    </div>
                </div>

            </Suspense>

        </>

    )
}

export default AddProduct;