import ProducDataService from '../services/product.service';
import React, { Suspense, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    // const [id, setId] = useState(null);
    // constructor(props) {
    //     super(props);
    //     this.onChangeName = this.onChangeName.bind(this);
    //     this.onChangePrice = this.onChangePrice.bind(this);
    //     this.saveProduct = this.saveProduct.bind(this);
    //     this.newProduct = this.newProduct.bind(this);
    //     this.state = {
    //         id: null,
    //         name: "",
    //         price: "",

    //         submitted: false
    //     };
    // }
    const addNotification = () => {
        // use a random type of notification
        toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const onChangeName = (e) => {
        let name = e.target.value
        setName(name);
    }

    const onChangePrice = (e) => {
        let price = e.target.value;
        setPrice(price);
    }

    const onChangeImage = (e) => {
        let image = e.target.value;
        setImage(image);
    }

    const saveProduct = () => {
        var data = {
            name: name,
            price: price,
            image: image
        };
        ProducDataService.create(data)
            .then(response => {
                console.log(response);
                // setId(response.data.id);
                setName(response.data.name);
                setPrice(response.data.price);
                setImage(response.data.image);
                setSubmitted(true);
                addNotification();
            })
            .catch(e => {
                console.log(e);
            });
    }

    const newProduct = () => {
        // setId(null);
        setName("");
        setPrice("");
        setImage("");
        setSubmitted(false)
    }



    return (
        <Suspense fallback="Loading...">
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>Produto adicionado com sucesso!</h4>

                        <button className="btn btn-success" onClick={newProduct}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>


                        <button onClick={addNotification}>Notify</button>;
                        <div className="form-group">
                            <label htmlFor="title">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={name}
                                onChange={onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Preço</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                required
                                value={price}
                                onChange={onChangePrice}
                                name="price"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">URL Imagem</label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                required
                                value={image}
                                onChange={onChangeImage}
                                name="image"
                            />
                        </div>

                        <button onClick={saveProduct} className="btn btn-success">
                            Adicionar
                        </button>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                )}
            </div>



        </Suspense>
          
)}

export default AddProduct;