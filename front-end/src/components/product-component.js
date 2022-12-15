import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { withRouter } from '../common/with-router';
import "bootstrap/dist/css/bootstrap.min.css";
class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.getProdut = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        name: "",
        price: "",
        image: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduct(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          name: name
        }
      };
    });
  }

  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        price: price
      }
    }));
  
  }
  onChangeImage(e) {
    const image = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        image: image
      }
    }));
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateProduct() {
    ProductDataService.update(
      this.state.currentProduct.id,
      this.state.currentProduct
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O produto foi alterado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/products');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProduct.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Preço</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentProduct.price}
                  onChange={this.onChangePrice}
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Imagem</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProduct.image}
                  onChange={this.onChangeImage}
                />
              </div>

            </form>


            <button
              className="badge bg-danger mr-2"
              onClick={this.deleteProduct}
            >
              Deletar
            </button>

            <button
              type="submit"
              className="badge bg-success"
              onClick={this.updateProduct}
            >
              Alterar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione um produto para visualizar os dados</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Product);