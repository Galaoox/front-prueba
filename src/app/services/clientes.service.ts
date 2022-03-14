import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { ICliente } from '@interfaces/ICliente';
import { IResponse } from '@interfaces/IResponse';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    route = 'Cliente/';

    constructor(private http: HttpClient) { }

    getClientes() {
        return this.http.get<IResponse<Array<ICliente>>>(environment.API_URL + this.route);
    }

    getCliente(id: number) {
        return this.http.get<IResponse<ICliente>>(environment.API_URL + this.route + id);
    }

    deleteCliente(id: number) {
        return this.http.delete(environment.API_URL + this.route + id);
    }

    updateCliente(id: number, cliente: ICliente) {
        return this.http.put(environment.API_URL + this.route + id, cliente);
    }

    createCliente(cliente: ICliente) {
        return this.http.post(environment.API_URL + this.route, cliente);
    }
}
