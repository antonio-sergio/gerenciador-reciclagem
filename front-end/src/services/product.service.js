import http from "../http-route";

class ProductDataService {
    create(product){
        return http.post("/products", product)
    }
}

export default new ProductDataService();