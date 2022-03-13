import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { IProducto } from '@interfaces/IProducto';
import { IResponse } from '@interfaces/IResponse';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    route = 'Producto/';

    constructor(private http: HttpClient) { }

    getProductos() {
        return this.http.get<IResponse<Array<IProducto>>>(environment.API_URL + this.route);
    }

    getProducto(id: number) {
        return this.http.get<IResponse<IProducto>>(environment.API_URL + this.route + id);
    }

    deleteProducto(id: number) {
        return this.http.delete(environment.API_URL + this.route + id);
    }

    updateProducto(id: number, producto: IProducto) {
        return this.http.put(environment.API_URL + this.route + id, producto);
    }

    createProducto(producto: IProducto) {
        return this.http.post(environment.API_URL + this.route, producto);
    }

}
