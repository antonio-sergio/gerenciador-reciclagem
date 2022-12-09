import ProducDataService from '../services/product.service';
import React, { Component } from "react";

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.saveProduct = this.saveProduct.bind(this);

        this.state = {
            name: "",
            price: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    saveProduct() {
        var product = {
            name: this.state.name,
            price: this.state.price
        };
        console.log('product dentro do save', product)
        ProducDataService.create(product)
            .then(response => {
                console.log('response', response);
                // console.log('response product props', response.product);
                // this.setState({
                //     name: response.product.name,
                //     price: response.product.price,
                // });
                // console.log('product response',response.product);
            })
            .catch(e => {
                console.log(e);
            });
    }

    
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        nada nada
                        {/* <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add
                        </button> */}
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                required
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                name="price"
                            />
                        </div>

                        <button onClick={this.saveProduct} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}