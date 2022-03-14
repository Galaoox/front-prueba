import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { IResponse } from '@interfaces/IResponse';
import { IVenta } from '@interfaces/IVenta';

@Injectable({
    providedIn: 'root'
})
export class VentasService {

    route = 'Venta/';

    constructor(private http: HttpClient) { }

    getVentas() {
        return this.http.get<IResponse<Array<IVenta>>>(environment.API_URL + this.route);
    }

    deleteVenta(id: number) {
        return this.http.delete(environment.API_URL + this.route + id);
    }

    createVenta(venta: IVenta) {
        return this.http.post(environment.API_URL + this.route, venta);
    }
}
