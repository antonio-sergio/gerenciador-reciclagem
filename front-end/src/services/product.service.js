import http from "../http-route";

class ProductDataService {
    create(product) {
        return http.post("/products", product);
    }

    findByName(name) {
        return http.get(`/products/search?name=${name}`);
    }

    get(id) {
        return http.get(`/products/${id}`);
    }

    getAll() {
        return http.get(`products`);
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    deleteAll() {
        return http.delete(`/products`);
      }

}

export default new ProductDataService();